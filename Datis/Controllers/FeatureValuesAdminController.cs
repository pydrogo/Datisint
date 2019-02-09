using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Models;
using Datis.Common;
using Datis.Data;
using System.Data.Entity.Validation;
namespace Datis.Controllers
{
    [Authorize(Roles = "FeatureValuesAdmin")]
    public class FeatureValuesAdminController : Controller
    {
        //
        // GET: /BrandAdmin/

        public ActionResult AjaxRead(FeatureValueSearchVM searchOptions, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var brandCategory = pe.BrandCategories.Where(n => n.Id == searchOptions.BrandCategoryId).FirstOrDefault();
                Category cat = brandCategory.Category;
                var features = pe.Features.Where(p => p.CategoryId == cat.Id).ToList();
                List<FeatureValuesVM> all = new List<FeatureValuesVM>();
                foreach (Feature item in features)
                {
                    var featureProduct = pe.FeatureProducts.Where(p => p.ProductId == searchOptions.ProductId && p.FeatureId == item.Id).FirstOrDefault();
                    FeatureValuesVM fvvm; 
                    if (featureProduct != null)
                    {
                        fvvm = new FeatureValuesVM()
                        {
                           Id = featureProduct.Id,
                           Name = item.Name,
                           CategoryId = cat.Id,
                           BrandCategoryId = searchOptions.BrandCategoryId,
                           FeatureId = item.Id,
                           ProductId = searchOptions.ProductId,
                           Value = featureProduct.Value
                         }; 
                    }
                    else
                    {
                        fvvm = new FeatureValuesVM()
                        {
                            Id = 0,
                            Name = item.Name,
                            CategoryId = cat.Id,
                            BrandCategoryId = searchOptions.BrandCategoryId,
                            FeatureId = item.Id,
                            ProductId = searchOptions.ProductId,
                            Value = ""
                        }; 
                    }
                    all.Add(fvvm);
                }
                //var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();
                return this.Store(all, all.Count());
            }
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult Save(FeatureValuesVM featureValueModel)
        {
            if (!ModelState.IsValid)
            {
                var result = new
                {
                    success = false,
                    message = Utils.GetModelStateErrorList(ModelState)
                };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                using (DatisEntities de = new DatisEntities())
                {
                    if (featureValueModel.Id > 0)
                    {

                        try
                        {
                            var fp = de.FeatureProducts.Where(m => m.Id == featureValueModel.Id).FirstOrDefault();
                            fp.Value = featureValueModel.Value;
                            de.SaveChanges();
                        }
                        catch (DbEntityValidationException e)
                        {
                            foreach (var eve in e.EntityValidationErrors)
                            {
                                foreach (var ve in eve.ValidationErrors)
                                {
                                    var result1 = new
                                    {
                                        success = false,
                                        message = ve.PropertyName + ve.ErrorMessage
                                    };
                                }
                            }
                            throw;
                        }
                        var result = new
                        {
                            success = true,
                            message = "ویرایش اطلاعات با موفقیت انجام شد",
                            data = new { Id = featureValueModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);

                    }

                    else
                    {
                        FeatureProduct newfp = new FeatureProduct() {
                            ProductId = featureValueModel.ProductId,
                            FeatureId = featureValueModel.FeatureId,
                            Value = featureValueModel.Value
                        };
                        de.FeatureProducts.Add(newfp);
                        de.SaveChanges();
                        var result = new
                        {
                            success = true,
                            message = "ثبت اطلاعات با موفقیت انجام شد",
                            data = new { Id = newfp.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }
    }
}

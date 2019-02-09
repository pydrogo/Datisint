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
    [Authorize(Roles = "ProductAdmin")]
    public class ProductAdminController : Controller
    {
        //
        // GET: /BrandAdmin/

        public ActionResult AjaxRead(ProductSearchVM searchOptions, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var all = pe.Products.Where(x => (x.Model.Contains(searchOptions.Model) || searchOptions.Model == null)).Select(m => new ProductVM()
                {
                    Id = m.Id,
                    Model = m.Model,
                    BrandCategoryId = m.BrandCategoryId ?? 0,
                    FeaturesSummary = m.FeaturesSummary,
                    Summary = m.Summary,
                    Description = m.Description
                });
                
                var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();
                return this.Store(result, all.Count());
            }
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult Save(Product productModel)
        {
            //var a = Request.Form[0];
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
                    if (productModel.Id > 0)
                    {
                        //var record = PradaEntities.AnalogBoxes.Where(m => m.Id == analogBoxModel.Id).FirstOrDefault();
                        //record = analogBoxModel;
                        try
                        {
                            //analogBoxModel.InsertDateTime = DateTime.Now;
                            de.Entry(productModel).State = System.Data.Entity.EntityState.Modified;
                            de.SaveChanges();
                        }
                        catch (DbEntityValidationException e)
                        {
                            foreach (var eve in e.EntityValidationErrors)
                            {
                                //Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                //    eve.Entry.Entity.GetType().Name, eve.Entry.State);
                                foreach (var ve in eve.ValidationErrors)
                                {
                                    var result1 = new
                                    {
                                        success = false,
                                        message = ve.PropertyName + ve.ErrorMessage
                                    };
                                    //Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                                    //    ve.PropertyName, ve.ErrorMessage);
                                }
                            }
                            throw;
                        }
                        var result = new
                        {
                            success = true,
                            message = "ویرایش اطلاعات با موفقیت انجام شد",
                            data = new { Id = productModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);

                    }

                    else
                    {
                        //analogBoxModel.InsertDateTime = DateTime.Now;

                        de.Products.Add(productModel);
                        de.SaveChanges();
                        var result = new
                        {
                            success = true,
                            message = "ثبت اطلاعات با موفقیت انجام شد",
                            data = new { Id = productModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }
        [HttpDelete]
        public ActionResult Delete(int Id)
        {
            using (DatisEntities de = new DatisEntities())
            {
                var record = de.Products.FirstOrDefault(m => m.Id == Id);
                de.Products.Remove(record);
                de.SaveChanges();
                var result = new
                {
                    success = true,
                    message = "حذف اطلاعات با موفقیت انجام شد"
                };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult BrandCategoryLookup()
        {
            using (var de = new DatisEntities())
            {
                var result = de.BrandCategories.Select(m => new
                {
                    Id = m.Id,
                    Title = m.Brand.Name + " | " + m.Category.Name 
                }).ToList();

                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

    }
}

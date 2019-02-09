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
    [Authorize(Roles = "FeatureAdmin")]
    public class FeatureAdminController : Controller
    {
        //
        // GET: /BrandAdmin/

        public ActionResult AjaxRead(CategorySearchVM searchOptions, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var all = pe.Features.Where(x => (x.Name.Contains(searchOptions.Name) || searchOptions.Name == null) && (x.CategoryId == searchOptions.CategoryId || searchOptions.CategoryId == 0)).Select(m => new FeatureVM()
                {
                    Id = m.Id,
                    Name = m.Name,
                    CategoryId = m.CategoryId ?? 0,
                    CategoryName = ""
                });


                var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();
                foreach (var item in result)
                {
                    var cat = pe.Categories.Where(m => m.Id == item.CategoryId).FirstOrDefault();
                    item.CategoryName = cat.Name;
                }
                return this.Store(result, all.Count());
            }
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult Save(Feature featureModel)
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
                    if (featureModel.Id > 0)
                    {
                        //var record = PradaEntities.AnalogBoxes.Where(m => m.Id == analogBoxModel.Id).FirstOrDefault();
                        //record = analogBoxModel;
                        try
                        {
                            //analogBoxModel.InsertDateTime = DateTime.Now;
                            de.Entry(featureModel).State = System.Data.Entity.EntityState.Modified;
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
                            data = new { Id = featureModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);

                    }

                    else
                    {
                        //analogBoxModel.InsertDateTime = DateTime.Now;
                        if (de.Features.Any(m => m.CategoryId == featureModel.CategoryId && m.Name == featureModel.Name))
                        {
                            var resultExists = new
                            {
                                success = false,
                                message = "قبلا این ویژگی ثبت شده است"
                            };
                            return Json(resultExists, JsonRequestBehavior.AllowGet);
                        }
                        de.Features.Add(featureModel);
                        de.SaveChanges();
                        var result = new
                        {
                            success = true,
                            message = "ثبت اطلاعات با موفقیت انجام شد",
                            data = new { Id = featureModel.Id }
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
                var record = de.Features.FirstOrDefault(m => m.Id == Id);
                var valuesToDelete = de.FeatureProducts.Where(m => m.FeatureId == record.Id);
                foreach (var item in valuesToDelete)
                {
                    de.FeatureProducts.Remove(item);
                }
                de.Features.Remove(record);
                de.SaveChanges();
                var result = new
                {
                    success = true,
                    message = "حذف اطلاعات با موفقیت انجام شد"
                };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult CategoryLookup()
        {
            using (var de = new DatisEntities())
            {
                var result = de.Categories.Select(m => new
                {
                    Id = m.Id,
                    Title = m.Name
                }).ToList();

                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

    }
}

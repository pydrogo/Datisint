using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Data;
using Datis.Common;
using System.Data.Entity.Validation;

namespace Datis.Controllers
{
    [Authorize(Roles = "DarbareDatis")]
    public class DarbareDatisController : Controller
    {
        public ActionResult Read()
        {
            using (DatisEntities de = new DatisEntities())
            {

                var all = de.SiteContents.Where(m => m.ArticleType == (int)DatisEnums.ArticleType.DarbareDatis).FirstOrDefault();
                return Json(all, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost, ValidateInput(false)]
        public ActionResult Save(SiteContent siteContentModel)
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
                    if (siteContentModel.Id > 0)
                    {
                        //var record = PradaEntities.AnalogBoxes.Where(m => m.Id == analogBoxModel.Id).FirstOrDefault();
                        //record = analogBoxModel;
                        try
                        {
                            siteContentModel.ArticleType = (int)DatisEnums.ArticleType.DarbareDatis;
                            de.Entry(siteContentModel).State = System.Data.Entity.EntityState.Modified;
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
                            data = new { Id = siteContentModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        siteContentModel.ArticleType = (int)DatisEnums.ArticleType.DarbareDatis;
                        de.SiteContents.Add(siteContentModel);
                        de.SaveChanges();
                        var result = new
                        {
                            success = true,
                            message = "ثبت اطلاعات با موفقیت انجام شد",
                            data = new { Id = siteContentModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }
    }
}
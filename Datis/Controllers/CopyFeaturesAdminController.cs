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
    [Authorize(Roles = "CopyFeaturesAdmin")]
    public class CopyFeaturesAdminController : Controller
    {


        [HttpPost, ValidateInput(false)]
        public ActionResult Save(int fromCategoryId, int toCategoryId, Boolean DeleteFeatures)
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
                if (fromCategoryId == toCategoryId)
                {
                    var result = new
                       {
                           success = true,
                           message = "کپی بین دسته بندی های متفاوت فقط امکان پذیر است.",
                           data = new { Id = -1 }
                       };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                using (DatisEntities de = new DatisEntities())
                {
                    if (DeleteFeatures)
                    {
                        var toDelete = de.Features.Where(m => m.CategoryId == toCategoryId);
                        foreach (var item in toDelete)
                        {
                            de.Features.Remove(item);
                        }
                        de.SaveChanges();
                    }
                    var features = de.Features.Where(m => m.CategoryId == fromCategoryId);
                    foreach (var item in features)
                    {
                        if (!de.Features.Any(m => m.CategoryId == toCategoryId && m.Name == item.Name))
                        {
                            Feature f = new Feature()
                            {
                                CategoryId = toCategoryId,
                                Name = item.Name
                            };
                            de.Features.Add(f);
                        }
                    }
                    de.SaveChanges();
                    var result = new
                    {
                        success = true,
                        message = "ثبت اطلاعات با موفقیت انجام شد",
                        data = new { Id = -1 }
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);

                }
            }
        }
    }
}

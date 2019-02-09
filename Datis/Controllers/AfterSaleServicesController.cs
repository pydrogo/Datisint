using Datis.Common;
using Datis.Data;
using Datis.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Datis.Controllers
{
    public class AfterSaleServicesController : Controller
    {
        //
        // GET: /AfterSaleServices/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GarrantyStatus()
        {
            return View();
        }
        public ActionResult GarrantyCheck(GarrantyCheckVM gcvm)
        {
            using (DatisEntities de = new DatisEntities())
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
                else if (Session["CaptchaGarranty"] == null || Session["CaptchaGarranty"].ToString() != gcvm.Captcha)
                {
                    ModelState.AddModelError("Captcha", "مجموع اشتباه است");
                    var result = new
                    {
                        success = false,
                        message = Utils.GetModelStateErrorList(ModelState)
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    Session["CaptchaGarranty"] = "";
                    //call service
                    var result = new
                    {
                        success = true,
                        message = "چک شد"
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            return View();
        }

        public ActionResult TermsOfGarranty()
        {
            using (DatisEntities de = new DatisEntities())
            {
                var res = de.TermsOfGarranties.Select(m => new TermsOfGarrantyVM()
                {
                    Id = m.Id,
                    Name = m.Name,
                    Description = m.Description,
                    Details = m.Details
                }).ToList();

                return View(res);
            }
        }

        public ActionResult ProductReturn()
        {
            using (DatisEntities de = new DatisEntities())
            {
                SiteContent sc = de.SiteContents.Where(m => m.ArticleType == (int)DatisEnums.ArticleType.ReturnProduct).FirstOrDefault();

                return View(sc);
            }
        }
        public ActionResult Repair()
        {
            List<SelectListItem> tamirMarjoo = new List<SelectListItem>();
            tamirMarjoo.Add(new SelectListItem() { Text = "تعمیر", Value = "0" });
            tamirMarjoo.Add(new SelectListItem() { Text = "مرجوعی از فروش", Value = "1" });
            using (var de = new DatisEntities())
            {
                List<SelectListItem> states = de.States.Select(m => new SelectListItem()
                {
                    Text = m.Name,
                    Value = SqlFunctions.StringConvert((double)m.Id).Trim()
                }).ToList();

                ViewBag.tamirmarjoo = tamirMarjoo;
                ViewBag.states = states;
                return View();
            }
        }

        public ActionResult SaveRepair(RepairMetadata rep)
        {
            using (DatisEntities de = new DatisEntities())
            {
                if (!ModelState.IsValid)
                {
                    var keys = from item in ModelState
                               where item.Value.Errors.Any()
                               select new {key =  item.Key, error =  item.Value.Errors.FirstOrDefault().ErrorMessage };
                    var res2 = JsonConvert.SerializeObject(keys);
                    var result = new
                    {
                        success = false,
                        message = res2//Utils.GetModelStateErrorList(ModelState)
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                else if (Session["CaptchaRepair"] == null || Session["CaptchaRepair"].ToString() != rep.Captcha)
                {
                    ModelState.AddModelError("Captcha", "مجموع اشتباه است");
                    var keys = from item in ModelState
                               where item.Value.Errors.Any()
                               select new { key = item.Key, error = item.Value.Errors.FirstOrDefault().ErrorMessage };
                    var res2 = JsonConvert.SerializeObject(keys);
                    var result = new
                    {
                        success = false,
                        message =res2//res2 Utils.GetModelStateErrorList(ModelState)
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    Session["CaptchaRepair"] = "";
                    //call service
                    de.Repairs.Add(new Repair
                    {
                        TamirOrMarjoo = rep.TamirOrMarjoo,
                        NameSherkat = rep.NameSherkat,
                        NameMasool = rep.NameMasool,
                        Ostan = rep.Ostan,
                        Shahrestan = rep.Shahrestan,
                        CodePosti = rep.CodePosti,
                        Tel = rep.Tel,
                        Mobile = rep.Mobile,
                        Email = rep.Email,
                        ModelDastgah = rep.ModelDastgah,
                        ShomareSerialDastgah = rep.ShomareSerialDastgah,
                        ShomareFactor = rep.ShomareFactor,
                        FactorDate = rep.FactorDate,
                        Address = rep.Address,
                        Eshkal = rep.Eshkal
                    });
                    de.SaveChanges();
                    var result = new
                    {
                        success = true,
                        message = "درخواست شما با موفقیت ارسال شد."
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            return View();
        }

        public ActionResult CityLookup(int stateId)
        {
            using (var de = new DatisEntities())
            {
                var result = de.Cities.Where(n => n.StateId == stateId).Select(m => new
                {
                    Id = m.Id,
                    Title = m.Name
                }).ToList();

                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
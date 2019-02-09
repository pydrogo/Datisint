using Datis.Common;
using Datis.Data;
using Datis.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Datis.Controllers
{
    public class SerialNumberController : Controller
    {
        //
        // GET: /Agancies/
        public ActionResult Index()
        {

            return View();
        }
        [HttpPost]
        public ActionResult ProductLookup(string term)
        {
            using (var de = new DatisEntities())
            {
                var allProducts = de.Products.Select(m => new SelectListItem()
                {
                    Text = m.Model + " - " + m.BrandCategory.Category.Name + " - " + m.BrandCategory.Brand.Name,
                    Value = SqlFunctions.StringConvert((double)m.Id).Trim()
                });
                List<SelectListItem> res = allProducts.Where(n => n.Text.Contains(term)).Take(10).ToList();
                return Json(res, JsonRequestBehavior.AllowGet);
            }
        }


        public ActionResult Save(SerialNumberMetadata model)
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
                else if (Session["CaptchaSerialNumber"] == null || Session["CaptchaSerialNumber"].ToString() != model.Captcha)
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
                    Session["CaptchaSerialNumber"] = "";
                    de.SerialNumbers.Add(new SerialNumber()
                    {
                        BuyDate = model.BuyDate,
                        Description = model.Description,
                        Email = model.Email,
                        InsertDate = DateTime.Now,
                        LastName = model.LastName,
                        Mobile = model.Mobile,
                        Name = model.Name,
                        ProductId = model.Product,
                        SerialNumber1 = model.Serial,

                    });
                    de.SaveChanges();
                    var result = new
                    {
                        success = true,
                        message = string.Format("شماره سریال {0} با موفقیت ثبت شد.", model.Serial),
                        savedSerial = model
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
        }
        [Authorize(Roles = "SerialNumber")]
        public ActionResult AjaxRead(string serialNumber, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var all = pe.SerialNumbers.Where(x => (x.SerialNumber1.Contains(serialNumber) || serialNumber == null)).Select(m => new SerialNumberVM()
                    {
                        Id = m.Id,
                        SerialNumber = m.SerialNumber1,
                        Name = m.Name,
                        BuyDate = m.BuyDate,
                        Description = m.Description,
                        Email = m.Email,
                        InsertDate1 = m.InsertDate ?? DateTime.MinValue,
                        LastName = m.LastName,
                        Mobile = m.Mobile,
                        Product = pe.Products.Where(p => p.Id == m.ProductId).Select(n => n.Model + n.BrandCategory.Category.Name + n.BrandCategory.Brand.Name).FirstOrDefault()
                    });
                var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();
                foreach (var res in result)
                {
                    DateTime d = DateTime.Parse(res.InsertDate1.ToString());
                    PersianCalendar pc = new PersianCalendar();
                    res.InsertDate = string.Format("{0}/{1}/{2}", pc.GetYear(d), pc.GetMonth(d), pc.GetDayOfMonth(d));

                }
                return this.Store(result, all.Count());
            }
        }

        [HttpDelete]
        [Authorize(Roles = "SerialNumber")]
        public ActionResult Delete(int Id)
        {
            using (DatisEntities de = new DatisEntities())
            {
                var record = de.SerialNumbers.FirstOrDefault(m => m.Id == Id);
                de.SerialNumbers.Remove(record);
                de.SaveChanges();
                var result = new
                {
                    success = true,
                    message = "حذف اطلاعات با موفقیت انجام شد"
                };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
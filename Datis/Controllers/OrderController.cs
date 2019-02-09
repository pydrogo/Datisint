using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Data;
using Datis.Models;
using Newtonsoft.Json;
using WebMatrix.WebData;

namespace Datis.Controllers
{

    public class OrderController : Controller
    {
        //
        // GET: /Order/
        [Authorize(Roles = "Namayandegi")]
        public ActionResult Index()
        {
            using (var de = new DatisEntities())
            {
                var user = de.UserProfiles.FirstOrDefault(m => m.UserName.Equals(User.Identity.Name));
                ViewBag.CustNo = user != null ? user.CustomerNo : "بدون شماره مشتری";
            }
            return View();
        }
        [HttpPost]
        [Authorize(Roles = "Namayandegi")]
        public ActionResult Add(OrderMetadata order)
        {
            using (DatisEntities de = new DatisEntities())
            {
                if (!ModelState.IsValid)
                {
                    var keys = from item in ModelState
                               where item.Value.Errors.Any()
                               let error = item.Value.Errors.FirstOrDefault()
                               where error != null
                               select new { key = item.Key, error = error.ErrorMessage };
                    var res2 = JsonConvert.SerializeObject(keys);
                    var result = new
                    {
                        success = false,
                        message = res2//Utils.GetModelStateErrorList(ModelState)
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var user = de.UserProfiles.FirstOrDefault(m => m.UserName.Equals(User.Identity.Name));
                    if (user != null)
                        de.Orders.Add(new Order()
                        {
                            UserId = user.UserId,
                            ProductId = order.ProductId,
                            Tedad = order.Tedad,
                            OrderDate = DateTime.Now
                        });
                    de.SaveChanges();
                    var result = new
                    {
                        success = true,
                        message = "سفارش شما با موفقیت ثبت شد."
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [Authorize(Roles = "Namayandegi")]
        public ActionResult GetUserOrder(int take, int skip, int page, int pageSize)
        {
            using (var de = new DatisEntities())
            {
                PersianCalendar pc = new PersianCalendar();
                var userProfile = de.UserProfiles.FirstOrDefault(m => m.UserName.Equals(User.Identity.Name));
                if (userProfile != null)
                {
                    var userid = userProfile.UserId;
                    var orders = de.Orders.Where(o => o.UserId == userid).OrderBy(m => m.OrderDate).Skip(skip).Take(take).ToList();
                    var res = new List<OrderVM>();
                    foreach (var item in orders)
                    {
                        var order = new OrderVM();
                        order.Tarikh = string.Format("{0}/{1}/{2}", pc.GetYear(item.OrderDate ?? DateTime.MinValue),
                            pc.GetMonth(item.OrderDate ?? DateTime.MinValue),
                            pc.GetDayOfMonth(item.OrderDate ?? DateTime.MinValue));
                        order.Id = item.Id;
                        var product = de.Products.FirstOrDefault(p => p.Id == item.ProductId);
                        if (product != null)
                            order.ProductName = product.Model;
                        order.Tedad = item.Tedad.ToString();
                        res.Add(order);
                    }
                    return Json(res, JsonRequestBehavior.AllowGet);
                }
                return Json("", JsonRequestBehavior.AllowGet);

            }
        }

        [HttpPost]
        [Authorize(Roles = "Namayandegi")]
        public ActionResult RemoveOrder(int id)
        {
            using (DatisEntities de = new DatisEntities())
            {
                if (id > 0)
                {
                    var user = de.UserProfiles.FirstOrDefault(m => m.UserName.Equals(User.Identity.Name));
                    if (user != null)
                        de.Orders.Remove(de.Orders.FirstOrDefault(m=>m.Id == id));
                    de.SaveChanges();
                    var result = new
                    {
                        success = true,
                        message = "سفارش شما با موفقیت حذف شد."
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                var result2 = new
                {
                    success = false,
                    message = "خطا در حذف"
                };
                return Json(result2, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
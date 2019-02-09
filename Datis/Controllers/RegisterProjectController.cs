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
using Newtonsoft.Json;

namespace Datis.Controllers
{
    [Authorize(Roles = "Namayandegi")]
    public class RegisterProjectController : Controller
    {
        //
        // GET: /Agancies/
        public ActionResult Index()
        {
            CreateOstanSelectListData();
            using (var de = new DatisEntities())
            {
                var project = new Project();
                de.Projects.Add(project);
                de.SaveChanges();

                var meta = new ProjectMetadata(){Id = project.Id};
                return View(meta);
            }
        }

        private void CreateOstanSelectListData()
        {
            using (var de = new DatisEntities())
            {
                List<SelectListItem> states = de.States.Select(m => new SelectListItem()
                {
                    Text = m.Name,
                    Value = SqlFunctions.StringConvert((double)m.Id).Trim()
                }).ToList();

                ViewBag.states = states;
            }
        }

        [HttpPost]
        [Authorize(Roles = "Namayandegi")]
        public ActionResult Index(ProjectMetadata project)
        {
            if (!ModelState.IsValid)
            {
                CreateOstanSelectListData();
                ViewBag.Error = "لطفا فرم را به صورت صحیح پر کنید.";
                return View();
            }
            else if (Session["CaptchaRegProject"] == null || Session["CaptchaRegProject"].ToString() != project.Captcha)
            {
                ModelState.AddModelError("Captcha", "مجموع اشتباه است");
                CreateOstanSelectListData();
                ViewBag.Error = "عبارت امنیتی اشتباه است.";
                return View();
            }
            else
            {
                using (var de = new DatisEntities())
                {

                    Session["CaptchaRegProject"] = "";
                    de.Projects.Add(new Project()
                    {
                        NameSherkatForushgah = project.NameSherkatForushgah,
                        NameModiramelMasool = project.NameModiramelMasool,
                        Email = project.Email,
                        Ostan = project.Ostan,
                        Shahrestan = project.Shahrestan,
                        Address = project.Address,
                        Mobile = project.Mobile,
                        Tel = project.Tel,
                        TarikheSabteProject = project.TarikheSabteProject,
                        TarikheTakhmineEjra = project.TarikheTakhmineEjra,
                        ProjectName = project.ProjectName,
                        OstaneProject = project.OstaneProject,
                        ShahreProject = project.ShahreProject,
                        AddressProject = project.AddressProject,
                        MohandesiGhablAzForush = project.MohandesiGhablAzForush,
                        Ejra = project.Ejra,
                        NaghsheKeshi = project.NaghsheKeshi,
                        MoshavereProject = project.MoshavereProject,
                        Janamayi = project.Janamayi,
                        Nezarat = project.Nezarat

                    });
                    de.SaveChanges();
                    ModelState.Clear();
                    ViewBag.Success = "با تشکر،درخواست شما با موفقیت ارسال شد.";
                    CreateOstanSelectListData();
                    var pr = new Project();
                    de.Projects.Add(pr);
                    de.SaveChanges();

                    var meta = new ProjectMetadata() { Id = pr.Id };
                    return View(meta);

                }
            }
        }




        [HttpPost]
        [Authorize(Roles = "Namayandegi")]
        public ActionResult Add(OrderMetadata order, int projectId)
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
                    {
                        var newOrder = new Order()
                        {
                            UserId = user.UserId,
                            ProductId = order.ProductId,
                            Tedad = order.Tedad,
                            OrderDate = DateTime.Now
                        };
                        de.Orders.Add(newOrder);

                        de.SaveChanges();
                        de.ProjectOrders.Add(new ProjectOrder()
                        {
                            ProjectId = projectId,
                            OrderId = newOrder.Id
                        });
                        de.SaveChanges();
                    }

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
        public ActionResult GetProjectOrder(int take, int skip, int page, int pageSize, int projectId)
        {
            using (var de = new DatisEntities())
            {

                try
                {
                    var orders = de.ProjectOrders.Where(o => o.ProjectId == projectId).OrderBy(m => m.Id).Skip(skip).Take(take).AsEnumerable().Select(n => new OrderVM()
                    {
                        Id = n.OrderId ?? 0,
                        ProductName = de.Products.FirstOrDefault(pp => pp.Id == de.Orders.FirstOrDefault(p => p.Id == n.OrderId).ProductId).Model,
                        Tedad = de.Orders.FirstOrDefault(p => p.Id == n.OrderId).Tedad.ToString()

                    }).ToList();
                    return Json(orders, JsonRequestBehavior.AllowGet);
                }
                catch (Exception)
                {
                    var orders = new List<OrderVM>();
                    return Json(orders, JsonRequestBehavior.AllowGet);
                }


            }
        }

        [HttpPost]
        [Authorize(Roles = "Namayandegi")]
        public ActionResult RemoveProjectOrder(int id, int projectId)
        {
            using (DatisEntities de = new DatisEntities())
            {
                if (id > 0)
                {
                    var user = de.UserProfiles.FirstOrDefault(m => m.UserName.Equals(User.Identity.Name));
                    if (user != null)
                    {
                        de.Orders.Remove(de.Orders.FirstOrDefault(m => m.Id == id));
                        de.ProjectOrders.RemoveRange(de.ProjectOrders.Where(m => m.OrderId == id && m.ProjectId == projectId));
                    }
                    de.SaveChanges();
                    var result = new
                    {
                        success = true,
                        message = "محصول مورد نظر شما با موفقیت حذف شد."
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



        [Authorize(Roles = "Agencies")]
        public ActionResult AjaxRead(AgancySearchVM searchOptions, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var all = pe.Agancies.Where(x => (x.NameSherkatForushgah.Contains(searchOptions.NameSherkatForushgah) || searchOptions.NameSherkatForushgah == null) &&
                    (x.NameModiramelMasool.Contains(searchOptions.NameModiramelMasool) || searchOptions.NameModiramelMasool == null)).Select(m => new AgancyRequestVM()
                    {
                        Id = m.Id,
                        NameSherkatForushgah = m.NameSherkatForushgah,
                        NameModiramelMasool = m.NameModiramelMasool,
                        Fax = m.Fax,
                        RegisterDate = m.RegisterDate,
                        RegisterPlace = m.RegisterPlace,
                        TedadPersonnelFanni = m.TedadPersonnelFanni,
                        TedadPersonnelEdari = m.TedadPersonnelEdari,
                        TedadPersonnelForush = m.TedadPersonnelForush,
                        ProjeAnjamDadeid = m.ProjeAnjamDadeid,
                        NamayandegBrandDashte = m.NamayandegBrandDashte,
                        TavanayiSaliane = m.TavanayiSaliane,
                        AshnayiBaPrada = m.AshnayiBaPrada,
                        EjareShakhsi = m.EjareShakhsi == 0 ? "اجاره" : "شخصی",
                        SanadMelki = m.SanadMelki ?? false,
                        Safte = m.Safte ?? false,
                        CheckeZemanat = m.CheckeZemanat ?? false,
                        ZemanatNamehBanki = m.ZemanatNamehBanki ?? false,
                        VajhNaghd = m.VajhNaghd ?? false,
                        Shahrestan = pe.Cities.Where(b => b.Id == m.Shahrestan).FirstOrDefault().Name,
                        Ostan = pe.States.Where(b => b.Id == m.Ostan).FirstOrDefault().Name,
                        Tel = m.Tel,
                        Mobile = m.Mobile,
                        Email = m.Email,
                        Address = m.Address,
                    });
                var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();
                foreach (var res in result)
                {
                    res.NoeZemanat = String.Format("{0} {1} {2} {3} {4}", res.SanadMelki ? "سند ملکی" : ""
                        , res.Safte ? "سفته" : ""
                        , res.CheckeZemanat ? "چک ضمانت" : ""
                        , res.ZemanatNamehBanki ? "ضمانت نامه بانکی" : ""
                        , res.VajhNaghd ? "وجه نقد" : "");
                }
                return this.Store(result, all.Count());
            }
        }

        [HttpDelete]
        [Authorize(Roles = "Agencies")]
        public ActionResult Delete(int Id)
        {
            using (DatisEntities de = new DatisEntities())
            {
                var record = de.Agancies.FirstOrDefault(m => m.Id == Id);
                de.Agancies.Remove(record);
                de.SaveChanges();
                var result = new
                {
                    success = true,
                    message = "حذف اطلاعات با موفقیت انجام شد"
                };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
        [Authorize(Roles = "Agencies")]
        public FileResult DownloadJavaz(string Id)
        {
            if (Id != null)
            {
                using (DatisEntities de = new DatisEntities())
                {
                    int resId = Convert.ToInt32(Id);
                    var agancy = de.Agancies.FirstOrDefault(m => m.Id == resId);
                    if (agancy != null)
                    {
                        var result = agancy.JavazOrAsasnameh;
                        byte[] fileBytes = System.IO.File.ReadAllBytes(Path.Combine(Server.MapPath("~"), result));
                        string fileName = "JavazOrAsasnameh.pdf";
                        return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
                    }
                }
            }
            return null;
        }
        [Authorize(Roles = "Agencies")]
        public FileResult DownloadPrintGardesh(string Id)
        {
            if (Id != null)
            {
                using (DatisEntities de = new DatisEntities())
                {
                    int resId = Convert.ToInt32(Id);
                    var agancy = de.Agancies.FirstOrDefault(m => m.Id == resId);
                    if (agancy != null)
                    {
                        var result = agancy.PrintGardesh;
                        byte[] fileBytes = System.IO.File.ReadAllBytes(Path.Combine(Server.MapPath("~"), result));
                        string fileName = "printGardeshHesab.pdf";
                        return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
                    }
                }
            }
            return null;
        }
    }
}
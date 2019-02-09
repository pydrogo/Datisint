using Datis.Common;
using Datis.Data;
using Datis.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.SqlServer;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Datis.Controllers
{
    public class AganciesController : Controller
    {
        //
        // GET: /Agancies/
        public ActionResult Index()
        {
            CreateOstanSelectListData();

            return View();
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
        public ActionResult Index(AgancyMetadata agancy)
        {
            if (!ModelState.IsValid)
            {
                CreateOstanSelectListData();
                ViewBag.Error = "لطفا فرم را به صورت صحیح پر کنید.";
                return View();
            }
            else if (Session["CaptchaAgancy"] == null || Session["CaptchaAgancy"].ToString() != agancy.Captcha)
            {
                ModelState.AddModelError("Captcha", "مجموع اشتباه است");
                CreateOstanSelectListData();
                ViewBag.Error = "عبارت امنیتی اشتباه است.";
                return View();
            }
            else
            {
                if (agancy.PrintGardeshFile != null && agancy.PrintGardeshFile.ContentLength > 0)
                {
                    var file = agancy.PrintGardeshFile;
                    var fileName = Path.GetFileName(file.FileName);
                    var extension = Path.GetExtension(file.FileName);
                    var serverName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName());
                    if (extension != ".pdf" && extension != ".jpg" && extension != ".png")
                    {
                        ModelState.AddModelError("PrintGardeshFile", "فرمت فایل گردش حساب نادرست");
                        CreateOstanSelectListData();
                        return View();
                    }
                    try
                    {
                        var path = Path.Combine(Server.MapPath("~/Content/PrintGardeshFiles"), serverName + extension);
                        file.SaveAs(path);
                        agancy.PrintGardesh = "Content/PrintGardeshFiles/" + serverName + extension;

                    }
                    catch (DirectoryNotFoundException)
                    {
                        Directory.CreateDirectory(Server.MapPath("~/Content/PrintGardeshFiles"));
                        var path = Path.Combine(Server.MapPath("~/Content/PrintGardeshFiles"), serverName + extension);
                        file.SaveAs(path);
                        agancy.PrintGardesh = "Content/PrintGardeshFiles/" + serverName + extension;
                    }
                }
                if (agancy.JavazOrAsasnamehFile != null && agancy.JavazOrAsasnamehFile.ContentLength > 0)
                {
                    var file = agancy.JavazOrAsasnamehFile;
                    var fileName = Path.GetFileName(file.FileName);
                    var extension = Path.GetExtension(file.FileName);
                    var serverName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName());
                    if (extension != ".pdf" && extension != ".jpg" && extension != ".png")
                    {
                        ModelState.AddModelError("JavazOrAsasnamehFile", "فرمت فایل جواز یا اساسنامه نادرست");
                        CreateOstanSelectListData();
                        return View();
                    }
                    try
                    {
                        var path = Path.Combine(Server.MapPath("~/Content/JavazOrAsasnamehFiles"), serverName + extension);
                        file.SaveAs(path);
                        agancy.JavazOrAsasnameh = "Content/JavazOrAsasnamehFiles/" + serverName + extension;

                    }
                    catch (DirectoryNotFoundException)
                    {
                        Directory.CreateDirectory(Server.MapPath("~/Content/JavazOrAsasnamehFiles"));
                        var path = Path.Combine(Server.MapPath("~/Content/JavazOrAsasnamehFiles"), serverName + extension);
                        file.SaveAs(path);
                        agancy.JavazOrAsasnameh = "Content/JavazOrAsasnamehFiles/" + serverName + extension;
                    }
                }
                using (var de = new DatisEntities())
                {

                    Session["CaptchaAgancy"] = "";
                    de.Agancies.Add(new Agancy()
                    {
                        NameSherkatForushgah = agancy.NameSherkatForushgah,
                        NameModiramelMasool = agancy.NameModiramelMasool,
                        Email = agancy.Email,
                        Ostan = agancy.Ostan,
                        Shahrestan = agancy.Shahrestan,
                        Address = agancy.Address,
                        Mobile = agancy.Mobile,
                        Tel = agancy.Tel,
                        Fax = agancy.Fax,
                        RegisterDate = agancy.RegisterDate,
                        RegisterPlace = agancy.RegisterPlace,
                        JavazOrAsasnameh = agancy.JavazOrAsasnameh,
                        TedadPersonnelFanni = agancy.TedadPersonnelFanni,
                        TedadPersonnelEdari = agancy.TedadPersonnelEdari,
                        TedadPersonnelForush = agancy.TedadPersonnelForush,
                        ProjeAnjamDadeid = agancy.ProjeAnjamDadeid,
                        NamayandegBrandDashte = agancy.NamayandegBrandDashte,
                        TavanayiSaliane = agancy.TavanayiSaliane,
                        AshnayiBaPrada = agancy.AshnayiBaPrada,
                        EjareShakhsi = agancy.EjareShakhsi,
                        SanadMelki = agancy.SanadMelki,
                        Safte = agancy.Safte,
                        CheckeZemanat = agancy.CheckeZemanat,
                        ZemanatNamehBanki = agancy.ZemanatNamehBanki,
                        VajhNaghd = agancy.VajhNaghd,
                        PrintGardesh = agancy.PrintGardesh,
                        TarikheSabteDarkhast = DateTime.Now
                    });
                    de.SaveChanges();
                    ModelState.Clear();
                    ViewBag.Success = "با تشکر،درخواست شما با موفقیت ارسال شد.";
                    CreateOstanSelectListData();
                    return View();

                }
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
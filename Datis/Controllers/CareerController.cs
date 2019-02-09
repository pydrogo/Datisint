using Datis.Common;
using Datis.Data;
using Datis.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Datis.Controllers
{
    public class CareerController : Controller
    {
        //
        // GET: /Career/
        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Career/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /Career/Create
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Career/Create
        [HttpPost]
        public ActionResult Index(CareerMetadata career)
        {
            if (!ModelState.IsValid)
            {
                //var keys = from item in ModelState
                //           where item.Value.Errors.Any()
                //           select new { key = item.Key, error = item.Value.Errors.FirstOrDefault().ErrorMessage };
                //var res2 = JsonConvert.SerializeObject(keys);
                //var result = new
                //{
                //    success = false,
                //    message = res2//Utils.GetModelStateErrorList(ModelState)
                //};
                //return Json(result, JsonRequestBehavior.AllowGet);
                return View();
            }
            else if (Session["CaptchaGarranty"] == null || Session["CaptchaGarranty"].ToString() != career.Captcha)
            {
                ModelState.AddModelError("Captcha", "مجموع اشتباه است");
                //var keys = from item in ModelState
                //           where item.Value.Errors.Any()
                //           select new { key = item.Key, error = item.Value.Errors.FirstOrDefault().ErrorMessage };
                //var res2 = JsonConvert.SerializeObject(keys);
                //var result = new
                //{
                //    success = false,
                //    message = res2//res2 Utils.GetModelStateErrorList(ModelState)
                //};
                //return Json(result, JsonRequestBehavior.AllowGet);
                return View();
            }
            else
            {
                if (career.ResumeFile != null && career.ResumeFile.ContentLength > 0)
                {
                    Session["CaptchaGarranty"] = "";
                    var file = career.ResumeFile;
                    var fileName = Path.GetFileName(file.FileName);
                    var extension = Path.GetExtension(file.FileName);
                    var serverName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName());
                    if (extension != ".pdf")
                    {
                        ModelState.AddModelError("ResumeFile", "فایل pdf وارد کنید");
                        return View();
                    }
                    try
                    {
                        var path = Path.Combine(Server.MapPath("~/Content/ResumeFiles"), serverName + extension);
                        file.SaveAs(path);
                        career.ResumeFilePath = "Content/ResumeFiles/" + serverName + extension;

                    }
                    catch (DirectoryNotFoundException)
                    {
                        Directory.CreateDirectory(Server.MapPath("~/Content/ResumeFiles"));
                        var path = Path.Combine(Server.MapPath("~/Content/ResumeFiles"), serverName + extension);
                        file.SaveAs(path);
                        career.ResumeFilePath = "Content/ResumeFiles/" + serverName + extension;
                    }
                    using (var de = new DatisEntities())
                    {

                        de.Careers.Add(new Career()
                        {
                            Name = career.Name,
                            LastName = career.LastName,
                            CodeMelli = career.CodeMelli,
                            ResumeFilePath = career.ResumeFilePath
                        });
                        de.SaveChanges();
                        //var result = new
                        //{
                        //    success = true,
                        //    message = "درخواست شما با موفقیت ارسال شد."
                        //};
                        //return Json(result, JsonRequestBehavior.AllowGet);
                        ModelState.Clear();
                        ViewBag.Success = "با تشکر،درخواست شما با موفقیت ارسال شد.";
                        return View();

                    }
                }
                return View();
            }
        }

        //
        // GET: /Career/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /Career/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /Career/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /Career/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        [Authorize(Roles = "Career")]
        public ActionResult AjaxRead(CareerSearchVM searchOptions, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var all = pe.Careers.Where(x => (x.Name.Contains(searchOptions.Name) || searchOptions.Name == null) &&
                    (x.LastName.Contains(searchOptions.LastName) || searchOptions.LastName == null) &&
                    (x.CodeMelli.Contains(searchOptions.CodeMelli) || searchOptions.CodeMelli == null)).Select(m => new CareerVM()
                    {
                        Id = m.Id,
                        Name = m.Name,
                        LastName = m.LastName,
                        CodeMelli = m.CodeMelli,
                        ResumeFilePath = m.ResumeFilePath,
                    });
                var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();

                return this.Store(result, all.Count());
            }
        }
        [Authorize(Roles = "Career")]
        public FileResult Load(string ResumeId)
        {
            if (ResumeId!=null)
            {
                using (DatisEntities de = new DatisEntities())
                {
                    int resId = Convert.ToInt32(ResumeId);
                    var result = de.Careers.Where(m => m.Id == resId).FirstOrDefault().ResumeFilePath;
                    byte[] fileBytes = System.IO.File.ReadAllBytes(Path.Combine(Server.MapPath("~"),result));
                    string fileName = "resume.pdf";
                    return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, fileName);
                } 
            }
            return null;
        }
    }
}

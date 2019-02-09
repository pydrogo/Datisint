using Datis.Data;
using Datis.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Img = System.Drawing.Image;
using drawing = System.Drawing;

namespace Datis.Controllers
{
    [Authorize(Roles = "Image")]
    public class ImageController : Controller
    {
        //
        // GET: /Image/

        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(HttpPostedFileBase file, Image image)
        {
            if (file != null && file.ContentLength > 0)
            {
                using (var de3 = new DatisEntities())
                {
                    if (de3.Images.Where(m => m.BrandId == image.ProductId).Any() && image.TableId == (int)DatisEnums.TableId.Brand)
                    {
                        var result2 = new
                        {
                            success = false,
                            message = "برای این برند قبلا لوگو ثبت شده است"
                        };
                        return Json(result2, JsonRequestBehavior.AllowGet);
                    }
                    else if (de3.Images.Where(m => (m.ProductId == image.ProductId) && m.Type == 1).Any() && image.TableId == (int)DatisEnums.TableId.Product && image.Type == (int)DatisEnums.ImgeType.Main)
                    {
                        var result2 = new
                        {
                            success = false,
                            message = "برای این محصول قبلا تصویر اصلی ثبت شده است"
                        };
                        return Json(result2, JsonRequestBehavior.AllowGet);
                    }
                }
                var fileName = Path.GetFileName(file.FileName);
                var extension = Path.GetExtension(file.FileName);
                var serverName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName());
                try
                {
                    var path = Path.Combine(Server.MapPath("~/Content/ItemImages"), serverName + extension);
                    var path200 = Path.Combine(Server.MapPath("~/Content/ItemImages/200"), serverName + extension);
                    var path350 = Path.Combine(Server.MapPath("~/Content/ItemImages/350"), serverName + extension);
                    var path60 = Path.Combine(Server.MapPath("~/Content/ItemImages/60"), serverName + extension);
                    file.SaveAs(path);
                    Img photo = Img.FromFile(path);
                    #region 200*200
                    drawing.Bitmap b200 = Common.Utils.ResizeImage(photo, 200, 200);
                    b200.Save(path200);
                    #endregion
                    #region 350*350
                    drawing.Bitmap b350 = Common.Utils.ResizeImage(photo, 350, 350);
                    b350.Save(path350);
                    #endregion
                    #region 60*60
                    drawing.Bitmap b60 = Common.Utils.ResizeImage(photo, 60, 60);
                    b60.Save(path60);
                    #endregion
                    image.Name = fileName;
                    image.Extension = extension;
                    image.ServerName = serverName + extension;
                    image.Path = "Content/ItemImages/" + serverName + extension;

                }
                catch (DirectoryNotFoundException)
                {
                    Directory.CreateDirectory(Server.MapPath("~/Content/ItemImages"));
                    Directory.CreateDirectory(Server.MapPath("~/Content/ItemImages/200"));
                    Directory.CreateDirectory(Server.MapPath("~/Content/ItemImages/350"));
                    Directory.CreateDirectory(Server.MapPath("~/Content/ItemImages/60"));
                    var path = Path.Combine(Server.MapPath("~/Content/ItemImages"), serverName + extension);
                    var path200 = Path.Combine(Server.MapPath("~/Content/ItemImages/200"), serverName + extension);
                    var path350 = Path.Combine(Server.MapPath("~/Content/ItemImages/350"), serverName + extension);
                    var path60 = Path.Combine(Server.MapPath("~/Content/ItemImages/60"), serverName + extension);
                    file.SaveAs(path);
                    Img photo = Img.FromFile(path);
                    #region 200*200
                    drawing.Bitmap b200 = Common.Utils.ResizeImage(photo, 200, 200);
                    b200.Save(path200);
                    #endregion
                    #region 350*350
                    drawing.Bitmap b350 = Common.Utils.ResizeImage(photo, 350, 350);
                    b200.Save(path350);
                    #endregion
                    #region 60*60
                    drawing.Bitmap b60 = Common.Utils.ResizeImage(photo, 60, 60);
                    b200.Save(path60);
                    #endregion
                    image.Name = fileName;
                    image.Extension = extension;
                    image.ServerName = serverName + extension;
                    image.Path = "Content/ItemImages/" + serverName + extension;
                }
                if (ModelState.IsValid)
                {
                    using (var de = new DatisEntities())
                    {
                        if (image.TableId == (int)DatisEnums.TableId.Brand)
                        {
                            image.BrandId = image.ProductId;
                        }
                        else if (image.TableId == (int)DatisEnums.TableId.Category)
                        {
                            image.CategoryId = image.ProductId;
                        }
                        else if (image.TableId == (int)DatisEnums.TableId.Article
                            || image.TableId == (int)DatisEnums.TableId.Brochure
                            || image.TableId == (int)DatisEnums.TableId.Application
                            || image.TableId == (int)DatisEnums.TableId.SiteContent)
                        {
                            image.ForeignId = image.ProductId;
                        }
                        image.Type = image.Type ?? -1;
                        de.Images.Add(image);
                        de.SaveChanges();
                    }
                }
                var result = new
                {
                    success = true,
                    message = "ثبت اطلاعات با موفقیت انجام شد",
                    id = image.Id,
                    address = image.Path
                };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            return null;

        }


        [HttpPost]
        public ActionResult CreateFile(HttpPostedFileBase file, Datis.Data.File upfile)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileNameWithoutExtension(file.FileName);
                var extension = Path.GetExtension(file.FileName);
                var serverName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName());
                try
                {
                    var path = Path.Combine(Server.MapPath("~/Content/ItemFiles"), serverName + extension);
                    file.SaveAs(path);
                    upfile.Name = fileName;
                    upfile.Extension = extension;
                    upfile.ServerName = serverName + extension;
                    upfile.Path = "Content/ItemFiles/" + serverName + extension;

                }
                catch (DirectoryNotFoundException)
                {
                    Directory.CreateDirectory(Server.MapPath("~/Content/ItemFiles"));
                    var path = Path.Combine(Server.MapPath("~/Content/ItemFiles"), serverName + extension);
                    file.SaveAs(path);
                    upfile.Name = fileName;
                    upfile.Extension = extension;
                    upfile.ServerName = serverName + extension;
                    upfile.Path = "Content/ItemFiles/" + serverName + extension;
                }
                if (ModelState.IsValid)
                {
                    using (var de = new DatisEntities())
                    {
                        de.Files.Add(upfile);
                        de.SaveChanges();
                    }
                }
            }
            string fileImageIcon = upfile.Extension == ".zip" ? "Images/zip-icon.png" : upfile.Extension == ".pdf" ? "Images/pdf-icon.png" : "Images/file-icon.png";
            var result = new
            {
                success = true,
                message = "ثبت اطلاعات با موفقیت انجام شد",
                id = upfile.Id,
                address = fileImageIcon,
                name = upfile.Name
            };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Load(string ImageOrFile, long tableId, long productId, int typeOfFileOrImage)
        {
            //typeOfFileOrImage = 1 yani axe asli mahsool
            //typeOfFileOrImage = 2 yani axaye digeye mahsool
            using (DatisEntities de = new DatisEntities())
            {

                if (ImageOrFile == "1")//yani image mikhad load beshe
                {
                    var result = de.Images.Where(m => m.TableId == tableId && m.ProductId == productId && m.Type == typeOfFileOrImage).Select(x => new { adress = x.Path, id = x.Id }).ToList();
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                else//yani file mikhad load beshe
                {

                    var result = de.Files.Where(m => m.TableId == tableId && m.ForeignId == productId && m.Type == typeOfFileOrImage).Select(x => new FilesVM { adress = x.Path, id = x.Id, typeOfFile = x.Extension, name = x.Name }).ToList();
                    foreach (var item in result)
                    {
                        if (item.typeOfFile == ".zip")
                        {
                            item.adress = "Images/zip-icon.png";
                        }
                        else if (item.typeOfFile == ".pdf")
                        {
                            item.adress = "Images/pdf-icon.png";
                        }
                        else
                        {
                            item.adress = "Images/file-icon.png";
                        }

                    }
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
        }

        [HttpPost]
        public ActionResult Delete(long Id, int FileOrImage)
        {
            using (var de = new DatisEntities())
            {
                if (FileOrImage == 1)
                {
                    var image = de.Images.Where(m => m.Id == Id).FirstOrDefault();
                    string fullPath = Request.MapPath("~/" + image.Path);
                    if (System.IO.File.Exists(fullPath))
                    {
                        System.IO.File.Delete(fullPath);
                    }
                    de.Images.Remove(image);
                    de.SaveChanges();
                    return Json(Id, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var file = de.Files.Where(m => m.Id == Id).FirstOrDefault();
                    string fullPath = Request.MapPath("~/" + file.Path);
                    if (System.IO.File.Exists(fullPath))
                    {
                        System.IO.File.Delete(fullPath);
                    }
                    de.Files.Remove(file);
                    de.SaveChanges();
                    return Json(Id, JsonRequestBehavior.AllowGet);
                }
            }

        }

        [HttpGet]
        public ActionResult SliderImages()
        {
            List<string> images = new List<string>();
            foreach (string s in Directory.GetFiles(Server.MapPath("~/FileManager/upload/CategorySlides")).Select(Path.GetFileName))
            {
                images.Add(s);
            }
            return Json(images, JsonRequestBehavior.AllowGet);
        }
    }
}
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Common;
using Datis.Data;
using Datis.Models;

namespace Datis.Controllers
{

    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            ViewBag.Message = "";
            using (DatisEntities de = new DatisEntities())
            {
                ViewBag.AboutUs =
                    de.SiteContents
                        .FirstOrDefault(m => m.ArticleType == (int)DatisEnums.ArticleType.DarbareDatis);
                ViewBag.Solution = de.Solutions.Select(m => new TermsOfGarrantyVM()
                {
                    Id = m.Id,
                    Name = m.Name,
                    Description = m.Description,
                    Details = m.Details
                }).ToList();

                var res = de.SiteContents.Where(m => m.ArticleType == (int)DatisEnums.ArticleType.Technology).Select(x => new ArticleVM()
                   {
                       Id = x.Id,
                       Title = x.Title,
                       Details = x.Article,
                       Image = de.Images.FirstOrDefault(n => n.TableId == (int)DatisEnums.TableId.Technology && n.ProductId == x.Id).Path,
                       File = de.Files.FirstOrDefault(n => n.TableId == (int)DatisEnums.TableId.Technology && n.ForeignId == x.Id).Path,
                       HasFile = de.Files.Any(n => n.TableId == (int)DatisEnums.TableId.Technology && n.ForeignId == x.Id),
                       FileTypeLogo = de.Files.FirstOrDefault(n => n.TableId == (int)DatisEnums.TableId.Technology && n.ForeignId == x.Id).Extension == ".zip" ? "Images/zip-icon.png"
                       : de.Files.FirstOrDefault(n => n.TableId == (int)DatisEnums.TableId.Technology && n.ForeignId == x.Id).Extension == ".pdf" ? "Images/pdf-icon.png" : "Images/file-icon.png"
                   }).ToList();
                foreach (var item in res)
                {
                    item.Image200 = item.Image.AddDirectoryToPath("200");
                    item.Image350 = item.Image.AddDirectoryToPath("350");
                    item.Image60 = item.Image.AddDirectoryToPath("60");
                }
                ViewBag.Technologies = res;

                List<ImageVM> customerImages = new List<ImageVM>();
                try
                {
                    foreach (string s in Directory.GetFiles(Server.MapPath("~/FileManager/upload/CustomersLogo")).Select(Path.GetFileName))
                    {

                        var imageVm = new ImageVM { Path = "FileManager/upload/CustomersLogo/" + s };
                        var fileInfo = de.FileManagerFiles.FirstOrDefault(m => m.FileName == s);
                        imageVm.TitleOrUrl = fileInfo != null ? fileInfo.TitleOrUrl : string.Empty;
                        customerImages.Add(imageVm);
                    }
                }
                catch (Exception)
                {

                }
                ViewBag.CustomersLogo = customerImages;

                List<ImageVM> images = new List<ImageVM>();
                try
                {
                    foreach (string s in Directory.GetFiles(Server.MapPath("~/FileManager/upload/FirstPageSlides")).Select(Path.GetFileName))
                    {
                        var imageVm = new ImageVM { Path = "FileManager/upload/FirstPageSlides/" + s };
                        var fileInfo = de.FileManagerFiles.FirstOrDefault(m => m.FileName == s);
                        imageVm.TitleOrUrl = fileInfo != null ? fileInfo.TitleOrUrl : string.Empty;
                        images.Add(imageVm);
                    }
                }
                catch (Exception)
                {

                }
                ViewBag.Slides = images;

            }
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}

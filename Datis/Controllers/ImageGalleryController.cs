using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Datis.Controllers
{
    public class ImageGalleryController : Controller
    {
        //
        // GET: /ImageGallery/
        public ActionResult Index()
        {
            List<string> images = new List<string>();
            foreach (string s in Directory.GetFiles(Server.MapPath("~/FileManager/upload/ImageGallery")).Select(Path.GetFileName))
            {
                images.Add("FileManager/upload/ImageGallery/" + s);
            }
            ViewBag.Slides = images;
            return View(images);
        }
	}
}
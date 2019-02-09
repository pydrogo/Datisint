using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Data;
using Datis.Models;

namespace Datis.Controllers
{
    public class ContactUsController : Controller
    {
        //
        // GET: /AboutUs/
        public ActionResult Index()
        {
            using (DatisEntities de = new DatisEntities())
            {
                SiteContent sc = de.SiteContents.Where(m => m.ArticleType == (int)DatisEnums.ArticleType.TamasBaMa).FirstOrDefault();

                return View(sc);
            }
        }
	}
}
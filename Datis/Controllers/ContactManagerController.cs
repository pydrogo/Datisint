using Datis.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Data;
using Datis.Common;

namespace Datis.Controllers
{
    public class ContactManagerController : Controller
    {
        //
        // GET: /ContactManager/
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Save(ClientsMessage model)
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
                else{
                    de.ClientsMessages.Add(model);
                    de.SaveChanges();
                    var result = new
                    {
                        success = true,
                        message = "پیام شما با موفقیت ارسال شد. با تشکر"
                    };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
            }
            
        } 
	}
}
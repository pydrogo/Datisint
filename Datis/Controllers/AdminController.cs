using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Datis.Common;
using Datis.Models;
using Newtonsoft.Json;

namespace Datis.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        //
        // GET: /Admin/
        [DoNotAuthorize(Roles = "Namayandegi")]
        public ActionResult Index()
        {
            return View();
        }

        [DoNotAuthorize(Roles = "Namayandegi")]
        public ActionResult TreeMenuItems()
        {
            var menu = new List<TreeMenuItem>();

            string[] userRole = new Security.DatisRoleProvider().GetRolesForUser(User.Identity.Name);

            if (string.IsNullOrWhiteSpace(User.Identity.Name) || (userRole.Contains("Namayandegi")))
                Response.Redirect("~/Home/Index");

            if (userRole.Contains("Admin"))
            {
                menu.Add(new TreeMenuItem()
                {
                    iconCls = "icon-GroupGear",
                    text = "مدیریت کاربران",
                    url = "Account/Register",
                    leaf = "true"
                });
            }

            var root = new TreeMenuItem()
            {
                iconCls = "icon-Store",
                text = "ورود اطلاعات",
                leaf = "false",
                expanded = "true"
            };

            if (userRole.Contains("BrandAdmin"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "Brand",
                    viewPath = "prada.page.views.Brand",
                    leaf = "true"
                });
            }

            if (userRole.Contains("CategoryAdmin"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "Category",
                    viewPath = "prada.page.views.Category",
                    leaf = "true"
                });
            }

            if (userRole.Contains("FeatureAdmin"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "Feature",
                    viewPath = "prada.page.views.Feature",
                    leaf = "true"
                });
            }


            if (userRole.Contains("ProductAdmin"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "Product",
                    viewPath = "prada.page.views.Product",
                    leaf = "true"
                });
            }

            if (userRole.Contains("CopyFeaturesAdmin"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "CopyFeatures",
                    viewPath = "prada.page.views.CopyFeatures",
                    leaf = "true"
                });
            }

            if (userRole.Contains("ImageManager"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "مدیریت عکس و ویدئو",
                    url = "FileManager/Default.aspx",
                    leaf = "true"
                });
            }

            if (userRole.Contains("DarbareDatis"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "درباره داتیس",
                    viewPath = "prada.page.views.DarbareDatis",
                    leaf = "true"
                });
            }

            if (userRole.Contains("TaMasBaMa"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "تماس با ما",
                    viewPath = "prada.page.views.TamasBaMa",
                    leaf = "true"
                });
            }

            if (userRole.Contains("ContactManagerAdmin"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "پیام های مدیریت",
                    viewPath = "prada.page.views.ContactManager",
                    leaf = "true"
                });
            }

            if (userRole.Contains("TermsOfGarrantyAdmin"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "شرایط گارانتی",
                    viewPath = "prada.page.views.TermsOfGarranty",
                    leaf = "true"
                });
            }

            if (userRole.Contains("ReturnProductAdmin"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "ارجاع کالا",
                    viewPath = "prada.page.views.ReturnProduct",
                    leaf = "true"
                });
            }

            if (userRole.Contains("RepairAdmin"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "درخواست های تعمیر یا ارجاع کالا",
                    viewPath = "prada.page.views.Repair",
                    leaf = "true"
                });
            }

            if (userRole.Contains("Career"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "درخواست های همکاری",
                    viewPath = "prada.page.views.Career",
                    leaf = "true"
                });
            }

            if (userRole.Contains("Agencies"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "درخواست های نمایندگی",
                    viewPath = "prada.page.views.Agancy",
                    leaf = "true"
                });
            }

            if (userRole.Contains("Projects"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "پروژه های انجام شده",
                    viewPath = "prada.page.views.Projects",
                    leaf = "true"
                });
            }

            if (userRole.Contains("Faq"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "پرسشهای متداول",
                    viewPath = "prada.page.views.Faq",
                    leaf = "true"
                });
            }

            if (userRole.Contains("Solution"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "راهکار های داتیس",
                    viewPath = "prada.page.views.Solution",
                    leaf = "true"
                });
            }

            if (userRole.Contains("Article"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "مقالات",
                    viewPath = "prada.page.views.Article",
                    leaf = "true"
                });
            }

            if (userRole.Contains("Brochure"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "بروشور",
                    viewPath = "prada.page.views.Brochure",
                    leaf = "true"
                });
            }

            if (userRole.Contains("Application"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "نرم افزارهای کاربردی",
                    viewPath = "prada.page.views.Application",
                    leaf = "true"
                });
            }

            if (userRole.Contains("SerialNumber"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "شماره سریال های ثبت شده",
                    viewPath = "prada.page.views.SerialNumber",
                    leaf = "true"
                });
            }

            if (userRole.Contains("NewsAdmin"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "مدیریت اخبار",
                    viewPath = "prada.page.views.News",
                    leaf = "true"
                });
            }

            if (userRole.Contains("Technology"))
            {
                root.children.Add(new TreeMenuItem()
                {
                    iconCls = "icon-Category",
                    text = "مدیریت تکنولوژیها",
                    viewPath = "prada.page.views.Technology",
                    leaf = "true"
                });
            }

            menu.Add(root);

            var result = new
            {
                success = true,
                message = "Loaded",
                children = menu
            };
            return Json(result, JsonRequestBehavior.AllowGet);

        }
    }
}

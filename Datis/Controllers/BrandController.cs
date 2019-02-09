using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Data;
using Datis.Models;
using Datis.Common;
using System.IO;

namespace Datis.Controllers
{
    [RoutePrefix("Brand")]
    public class BrandController : Controller
    {
        //
        // GET: /Brand/

        public ActionResult Index()
        {
            using (var de = new DatisEntities())
            {
                var brands = de.Brands.ToList();
                List<BrandVM> bs = new List<BrandVM>();
                foreach (var item in brands)
                {
                    string logo = de.Images.Where(n => n.BrandId == item.Id).Select(f => f.Path).FirstOrDefault();
                    BrandVM bvm = new BrandVM()
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Description = item.Description,
                                Logo =logo!=null ? logo.AddDirectoryToPath("200"):""
                            };
                    bs.Add(bvm);
                }

                return View(bs);
            }
        }
        [Route("{Id}/{BrandTitle}")]
        public ActionResult Index(int Id)
        {
            using (var de = new DatisEntities())
            {
                Brand currentBrand = de.Brands.Where(m => m.Id == Id).FirstOrDefault();
                if (currentBrand != null)
                {
                    //List<Category> cats = de.BrandCategories.Where(m => m.BrandId == currentBrand.Id).Select(p => p.Category).ToList();

                    //if (cats.Count > 0)
                    //{
                    //    CategoryPageVM cpvm = new CategoryPageVM();

                    //    cpvm.ParentName = currentBrand.Name;

                    //    cpvm.Cats = cats.Select(f => new CategoryVM()
                    //    {
                    //        Id = f.Id,
                    //        Name = f.Name,

                    //    }).ToList();
                    //    List<KeyValuePair<string, string>> breadItems = new List<KeyValuePair<string, string>>();
                    //    KeyValuePair<string, string> rootBrand = new KeyValuePair<string, string>(currentBrand.Name, Url.Action("Index", "Category", new { Id = currentBrand.Id, BrandTitle = currentBrand.Name }));
                    //    breadItems.Add(rootBrand);
                    //    ViewBag.BreadCrumb = breadItems;
                    //    return View("~/Views/Category/Index.cshtml", cpvm);
                    //}
                    //else
                    //{//return 404

                    //    return View();

                    //}
                    List<BrandCategory> cats = de.BrandCategories.Where(m => m.BrandId == currentBrand.Id).ToList();//.Select(p => p.Category).ToList();

                    if (cats.Count > 0)
                    {
                        CategoryPageVM cpvm = new CategoryPageVM();

                        cpvm.ParentName = currentBrand.Name;

                        cpvm.Cats = cats.Select(f => new BrandCategoryVM()
                        {
                            CatId = f.Category.Id,
                            CatName = f.Category.Name,
                            Id = f.Id


                        }).ToList();
                        foreach (var item in cpvm.Cats)
                        {
                            Image logo = de.Images.Where(m => m.TableId == (int)DatisEnums.TableId.Category && m.CategoryId == item.CatId).FirstOrDefault();
                            item.CatLogo = logo != null ? logo.Path.AddDirectoryToPath("200") : "";
                        }
                        List<KeyValuePair<string, string>> breadItems = new List<KeyValuePair<string, string>>();
                        KeyValuePair<string, string> rootBrand = new KeyValuePair<string, string>(currentBrand.Name, Url.Action("Index", "Category", new { Id = currentBrand.Id, BrandTitle = currentBrand.Name }));
                        breadItems.Add(rootBrand);
                        ViewBag.BreadCrumb = breadItems;
                        List<string> images = new List<string>();
                        foreach (string s in Directory.GetFiles(Server.MapPath("~/FileManager/upload/CategorySlides")).Select(Path.GetFileName))
                        {
                            images.Add("FileManager/upload/CategorySlides/" + s);
                        }
                        ViewBag.Slides = images;
                        return View("~/Views/Category/Index.cshtml", cpvm);
                    }
                    else
                    {//return 404

                        return View();

                    }
                }
                else
                {//Id ghalate 404 bargarde
                    return null;
                }

            }
        }
    }
}
using Datis.Data;
using Datis.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Common;
using System.IO;

namespace Datis.Controllers
{
    [RoutePrefix("Category")]
    public class CategoryController : Controller
    {
        //
        // GET: /Category/
        [Route("{Id}/{CategoryTitle}")]
        public ActionResult Index(int Id)
        {
            //using (var de = new DatisEntities())
            //{
            //    Category cat = de.Categories.Where(m => m.Id == Id).FirstOrDefault();
            //    if (cat != null)
            //    {
            //        var childs = de.CategoryChildrens.Where(p => p.ParentId == cat.Id).Select(z => z.ChildId).ToList();
            //        if (childs.Count > 0)
            //        {
            //            CategoryPageVM cpvm = new CategoryPageVM();

            //            //if (cat.ParentId != null)
            //            //{
            //                cpvm.ParentName = cat.Name;//de.Categories.Where(b => b.Id == cat.ParentId).FirstOrDefault().Name;
            //            //}
            //            //else
            //            //{

            //            //    var brands = de.BrandCategories.Where(m => m.BrandId == cat.Id).Select(p => p.Brand.Name).ToList();
            //            //    cpvm.ParentName = string.Join(",", brands);
            //            //}
            //            // Image imageLogo = de.Images.Where(n => n.CategoryId == Id && n.TableId == (int)DatisEnums.TableId.Category).FirstOrDefault();
            //            //string logo;
            //            //logo = imageLogo != null ? imageLogo.Path.AddDirectoryToPath("200") : "";
            //            cpvm.Cats = de.Categories.Where(m => childs.Contains(m.Id)).Select(f => new CategoryVM()
            //            {
            //                Id = f.Id,
            //                Name = f.Name,
            //                Logo = de.Images.Where(n => n.CategoryId == f.Id && n.TableId == (int)DatisEnums.TableId.Category).FirstOrDefault().Path

            //            }).ToList();
            //            foreach (var item in cpvm.Cats)
            //            {
            //                item.Logo = item.Logo != null ? item.Logo.AddDirectoryToPath("200") : "";
            //            }
            //            List<KeyValuePair<string, string>> breadItems = new List<KeyValuePair<string, string>>();
            //            KeyValuePair<string, string> rootCat = new KeyValuePair<string, string>(cat.Name, Url.Action("Index", "Category", new { Id = cat.Id, CategoryTitle = cat.Name }));
            //            Category cat2=null,cat3=null;
            //            KeyValuePair<string, string> secondeCat=new KeyValuePair<string,string>();
            //             KeyValuePair<string, string> thirdCat=new KeyValuePair<string,string>();
            //            if (cat.ParentId != null)
            //            {
            //                cat2 = de.Categories.Where(m => m.Id == cat.ParentId).FirstOrDefault();
            //                 secondeCat = new KeyValuePair<string, string>(cat2.Name, Url.Action("Index", "Category", new { Id = cat2.Id, CategoryTitle = cat2.Name })); ;
            //            }
            //            if (cat2 != null)
            //            {
            //                if (cat2.ParentId != null)
            //                {
            //                    cat3 = de.Categories.Where(m => m.Id == cat2.ParentId).FirstOrDefault();
            //                    if (cat3 != null)
            //                    {
            //                        thirdCat = new KeyValuePair<string, string>(cat3.Name, Url.Action("Index", "Category", new { Id = cat3.Id, CategoryTitle = cat3.Name })); ;
            //                    }
            //                } 
            //            }

            //            if(!thirdCat.Equals(default(KeyValuePair<string,string>)))breadItems.Add(thirdCat);
            //            if (!secondeCat.Equals(default(KeyValuePair<string, string>))) breadItems.Add(secondeCat);
            //            breadItems.Add(rootCat);
            //            ViewBag.BreadCrumb = breadItems;
            //            return View(cpvm);
            //        }
            //        else
            //        {//bayad bere safheye product
            //            List<BrandCategory> brandCats = de.BrandCategories.Where(m => m.CategoryId == Id).ToList();
            //            List<ProductVM> productsVM = new List<ProductVM>();
            //            foreach (var item in brandCats)
            //            {
            //                foreach (var product in item.Products)
            //                {
            //                    Image mLogo = de.Images.Where(m => m.ProductId == product.Id && m.Type == (int)DatisEnums.ImgeType.Main && m.TableId == (int)DatisEnums.TableId.Product).FirstOrDefault();
            //                    Image bLogo = de.Images.Where(m => m.BrandId == product.BrandCategory.BrandId && m.TableId == (int)DatisEnums.TableId.Brand).FirstOrDefault();
            //                    ProductVM pvm = new ProductVM() { 
            //                        Model = product.Model,
            //                        Id=product.Id,
            //                        Description = product.Description,
            //                        MainImage = mLogo != null ? mLogo.Path : "",
            //                        MainImage200 = mLogo != null ? mLogo.Path.AddDirectoryToPath("200") : "",
            //                        MainImage350 = mLogo != null ? mLogo.Path.AddDirectoryToPath("350") : "",
            //                        MainImage60 = mLogo != null ? mLogo.Path.AddDirectoryToPath("60") : "",
            //                        BrandName = product.BrandCategory.Brand.Name,
            //                        BrandLogo = bLogo != null ? bLogo.Path.AddDirectoryToPath("60") : "" 
            //                    };
            //                    productsVM.Add(pvm);
            //                }

            //            }
            //            List<KeyValuePair<string, string>> breadItems = new List<KeyValuePair<string, string>>();
            //            KeyValuePair<string, string> rootCat = new KeyValuePair<string, string>(cat.Name, Url.Action("Index", "Category", new { Id = cat.Id, CategoryTitle = cat.Name }));
            //            Category cat2 = null, cat3 = null;
            //            KeyValuePair<string, string> secondeCat = new KeyValuePair<string, string>();
            //            KeyValuePair<string, string> thirdCat = new KeyValuePair<string, string>();
            //            if (cat.ParentId != null)
            //            {
            //                cat2 = de.Categories.Where(m => m.Id == cat.ParentId).FirstOrDefault();
            //                secondeCat = new KeyValuePair<string, string>(cat2.Name, Url.Action("Index", "Category", new { Id = cat2.Id, CategoryTitle = cat2.Name })); ;
            //            }
            //            if (cat2 != null)
            //            {
            //                if (cat2.ParentId != null)
            //                {
            //                    cat3 = de.Categories.Where(m => m.Id == cat2.ParentId).FirstOrDefault();
            //                    if (cat3 != null)
            //                    {
            //                        thirdCat = new KeyValuePair<string, string>(cat3.Name, Url.Action("Index", "Category", new { Id = cat3.Id, CategoryTitle = cat3.Name })); ;
            //                    }
            //                } 
            //            }

            //            if (!thirdCat.Equals(default(KeyValuePair<string, string>))) breadItems.Add(thirdCat);
            //            if (!secondeCat.Equals(default(KeyValuePair<string, string>))) breadItems.Add(secondeCat);
            //            breadItems.Add(rootCat);
            //            ViewBag.BreadCrumb = breadItems;
            //            return View("~/Views/Product/Index.cshtml", productsVM);

            //        }
            //    }
            //    else
            //    {//Id ghalate
            //        return null;
            //    }


            //}

            using (var de = new DatisEntities())
            {
                BrandCategory brandCat = de.BrandCategories.Where(m => m.Id == Id).FirstOrDefault();
                Category cat = brandCat.Category;//de.Categories.Where(m => m.Id == Id).FirstOrDefault();
                if (cat != null)
                {
                    var childs = de.CategoryChildrens.Where(p => p.ParentId == cat.Id).Select(z => z.ChildId).ToList();
                    if (childs.Count > 0)
                    {
                        CategoryPageVM cpvm = new CategoryPageVM();

                        //if (cat.ParentId != null)
                        //{
                        cpvm.ParentName = cat.Name;//de.Categories.Where(b => b.Id == cat.ParentId).FirstOrDefault().Name;
                        //}
                        //else
                        //{

                        //    var brands = de.BrandCategories.Where(m => m.BrandId == cat.Id).Select(p => p.Brand.Name).ToList();
                        //    cpvm.ParentName = string.Join(",", brands);
                        //}
                        // Image imageLogo = de.Images.Where(n => n.CategoryId == Id && n.TableId == (int)DatisEnums.TableId.Category).FirstOrDefault();
                        //string logo;
                        //logo = imageLogo != null ? imageLogo.Path.AddDirectoryToPath("200") : "";
                        cpvm.Cats = de.BrandCategories.Where(m => childs.Contains(m.CategoryId) && m.BrandId == brandCat.BrandId).Select(f => new BrandCategoryVM()
                        {
                            Id = f.Id,
                            CatName = f.Category.Name,
                            CatId = f.Category.Id,
                            CatLogo = de.Images.Where(n => n.CategoryId == f.Category.Id && n.TableId == (int)DatisEnums.TableId.Category).FirstOrDefault().Path

                        }).ToList();
                        foreach (var item in cpvm.Cats)
                        {
                            item.CatLogo = item.CatLogo != null ? item.CatLogo.AddDirectoryToPath("200") : "";
                        }
                        List<KeyValuePair<string, string>> breadItems = new List<KeyValuePair<string, string>>();
                        KeyValuePair<string, string> rootBrand = new KeyValuePair<string, string>(brandCat.Brand.Name, Url.Action("Index", "Brand", new { Id = brandCat.Brand.Id, BrandTitle = brandCat.Brand.Name }));
                        KeyValuePair<string, string> rootCat = new KeyValuePair<string, string>(cat.Name, Url.Action("Index", "Category", new { Id = cat.Id, CategoryTitle = cat.Name }));
                        Category cat2 = null, cat3 = null;
                        KeyValuePair<string, string> secondeCat = new KeyValuePair<string, string>();
                        KeyValuePair<string, string> thirdCat = new KeyValuePair<string, string>();
                        if (cat.ParentId != null)
                        {
                            cat2 = de.Categories.Where(m => m.Id == cat.ParentId).FirstOrDefault();
                            secondeCat = new KeyValuePair<string, string>(cat2.Name, Url.Action("Index", "Category", new { Id = cat2.Id, CategoryTitle = cat2.Name })); ;
                        }
                        if (cat2 != null)
                        {
                            if (cat2.ParentId != null)
                            {
                                cat3 = de.Categories.Where(m => m.Id == cat2.ParentId).FirstOrDefault();
                                if (cat3 != null)
                                {
                                    thirdCat = new KeyValuePair<string, string>(cat3.Name, Url.Action("Index", "Category", new { Id = cat3.Id, CategoryTitle = cat3.Name })); ;
                                }
                            }
                        }

                        breadItems.Add(rootBrand);
                        breadItems.Add(rootCat);
                        if (!thirdCat.Equals(default(KeyValuePair<string, string>))) breadItems.Add(thirdCat);
                        if (!secondeCat.Equals(default(KeyValuePair<string, string>))) breadItems.Add(secondeCat);
                        ViewBag.BreadCrumb = breadItems;

                        List<string> images = new List<string>();
                        foreach (string s in Directory.GetFiles(Server.MapPath("~/FileManager/upload/CategorySlides")).Select(Path.GetFileName))
                        {
                            images.Add("FileManager/upload/CategorySlides/" + s);
                        }
                        ViewBag.Slides= images;
                        return View(cpvm);
                    }
                    else
                    {//bayad bere safheye product
                        BrandCategory currentBrandCat = de.BrandCategories.Where(m => m.Id == Id).FirstOrDefault();
                        List<ProductVM> productsVM = new List<ProductVM>();
                        foreach (var product in currentBrandCat.Products)
                        {
                            Image mLogo = de.Images.Where(m => m.ProductId == product.Id && m.Type == (int)DatisEnums.ImgeType.Main && m.TableId == (int)DatisEnums.TableId.Product).FirstOrDefault();
                            Image bLogo = de.Images.Where(m => m.BrandId == product.BrandCategory.BrandId && m.TableId == (int)DatisEnums.TableId.Brand).FirstOrDefault();
                            ProductVM pvm = new ProductVM()
                            {
                                Model = product.Model,
                                Id = product.Id,
                                Description = product.Description,
                                MainImage = mLogo != null ? mLogo.Path : "",
                                MainImage200 = mLogo != null ? mLogo.Path.AddDirectoryToPath("200") : "",
                                MainImage350 = mLogo != null ? mLogo.Path.AddDirectoryToPath("350") : "",
                                MainImage60 = mLogo != null ? mLogo.Path.AddDirectoryToPath("60") : "",
                                BrandName = product.BrandCategory.Brand.Name,
                                BrandLogo = bLogo != null ? bLogo.Path.AddDirectoryToPath("60") : ""
                            };
                            productsVM.Add(pvm);
                        }
                        List<KeyValuePair<string, string>> breadItems = new List<KeyValuePair<string, string>>();
                        KeyValuePair<string, string> rootBrand = new KeyValuePair<string, string>(currentBrandCat.Brand.Name, Url.Action("Index", "Brand", new { Id = currentBrandCat.BrandId, BrandTitle = currentBrandCat.Brand.Name }));
                        KeyValuePair<string, string> rootCat = new KeyValuePair<string, string>(cat.Name, Url.Action("Index", "Category", new { Id = cat.Id, CategoryTitle = cat.Name }));
                        Category cat2 = null, cat3 = null;
                        KeyValuePair<string, string> secondeCat = new KeyValuePair<string, string>();
                        KeyValuePair<string, string> thirdCat = new KeyValuePair<string, string>();
                        if (cat.ParentId != null)
                        {
                            cat2 = de.Categories.Where(m => m.Id == cat.ParentId).FirstOrDefault();
                            secondeCat = new KeyValuePair<string, string>(cat2.Name, Url.Action("Index", "Category", new { Id = cat2.Id, CategoryTitle = cat2.Name })); ;
                        }
                        if (cat2 != null)
                        {
                            if (cat2.ParentId != null)
                            {
                                cat3 = de.Categories.Where(m => m.Id == cat2.ParentId).FirstOrDefault();
                                if (cat3 != null)
                                {
                                    thirdCat = new KeyValuePair<string, string>(cat3.Name, Url.Action("Index", "Category", new { Id = cat3.Id, CategoryTitle = cat3.Name })); ;
                                }
                            }
                        }

                        breadItems.Add(rootBrand);
                        if (!thirdCat.Equals(default(KeyValuePair<string, string>))) breadItems.Add(thirdCat);
                        if (!secondeCat.Equals(default(KeyValuePair<string, string>))) breadItems.Add(secondeCat);
                        breadItems.Add(rootCat);
                        ViewBag.BreadCrumb = breadItems;
                        List<string> imagesp = new List<string>();
                        foreach (string s in Directory.GetFiles(Server.MapPath("~/FileManager/upload/ProductSlides")).Select(Path.GetFileName))
                        {
                            imagesp.Add("FileManager/upload/ProductSlides/" + s);
                        }
                        ViewBag.PSlides = imagesp;
                        return View("~/Views/Product/Index.cshtml", productsVM);

                    }
                }
                else
                {//Id ghalate
                    return null;
                }


            }


        }
    }
}
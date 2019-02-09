using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Data;
using System.Data.Entity;
using Datis.Models;

namespace Datis.Controllers
{
    public class PartialController : Controller
    {
        //
        // GET: /Partial/
        [ChildActionOnly]
        public ActionResult TopMenu()
        {
            //List<TopMenuVM> brands = null;
            //using (DatisEntities de = new DatisEntities())
            //{
            //    brands = de.Brands.Select(m => new TopMenuVM()
            //    {
            //        BrandName = m.Name,
            //        BrandId = m.Id
            //    }).ToList();
            //    foreach (var brandvm in brands)
            //    {
            //        var cats = de.BrandCategories.Where(x => x.BrandId == brandvm.BrandId).Select(m => m.Category).ToList();
            //        var listCategory = new List<MenuCategoryVM>();
            //        foreach (var cat in cats)
            //        {
            //            if (cat.ParentId == null)
            //            {
            //                var rootCat = new MenuCategoryVM()
            //                {
            //                    CatId = cat.Id,
            //                    Name = cat.Name
            //                };
            //                List<int?> childs = new List<int?>();
            //                childs = de.CategoryChildrens.Where(p => p.ParentId == cat.Id).Select(z => z.ChildId).ToList();
            //                rootCat.Children = de.Categories.Where(m => childs.Contains(m.Id)).Select(n => new MenuCategoryVM()
            //                {
            //                    Name = n.Name,
            //                    CatId = n.Id
            //                }).ToList();
            //                foreach (var item in rootCat.Children)
            //                {
            //                    List<int?> childs2 = new List<int?>();
            //                    childs2 = de.CategoryChildrens.Where(p => p.ParentId == item.CatId).Select(z => z.ChildId).ToList();
            //                    item.Children = de.Categories.Where(m => childs2.Contains(m.Id)).Select(n => new MenuCategoryVM()
            //                    {
            //                        Name = n.Name,
            //                        CatId = n.Id
            //                    }).ToList();
            //                }
            //                listCategory.Add(rootCat);
            //            }
            //        }
            //        brandvm.Categories = listCategory;

            //    }
            //    //brands.RemoveRange(1, brands.Count - 1);
            //    return PartialView("_TopMenu", brands.ToList());
            //}
            List<TopMenuVM> brands = null;
            using (DatisEntities de = new DatisEntities())
            {
                brands = de.Brands.Select(m => new TopMenuVM()
                {
                    BrandName = m.Name,
                    BrandId = m.Id
                }).ToList();
                foreach (var brandvm in brands)
                {
                    var brandCats = de.BrandCategories.Where(x => x.BrandId == brandvm.BrandId).ToList();
                    var cats = de.BrandCategories.Where(x => x.BrandId == brandvm.BrandId).Select(m => m.Category).ToList();
                    var listCategory = new List<MenuCategoryVM>();
                    foreach (var bcat in brandCats)
                    {
                        if (bcat.Category.ParentId == null)
                        {
                            var rootCat = new MenuCategoryVM()
                            {
                                CatId = bcat.Id,
                                Name = bcat.Category.Name
                            };
                            List<int?> childs = new List<int?>();
                            childs = de.CategoryChildrens.Where(p => p.ParentId == bcat.Category.Id).Select(z => z.ChildId).ToList();
                            rootCat.Children = de.BrandCategories.Where(m => childs.Contains(m.CategoryId) && m.BrandId == brandvm.BrandId).Select(n => new MenuCategoryVM()
                            {
                                Name = n.Category.Name,
                                CatId = n.Id
                            }).ToList();
                            foreach (var item in rootCat.Children)
                            {
                                List<int?> childs2 = new List<int?>();
                                childs2 = de.CategoryChildrens.Where(p => p.ParentId == item.CatId).Select(z => z.ChildId).ToList();
                                item.Children = de.BrandCategories.Where(m => childs2.Contains(m.CategoryId) && m.BrandId == brandvm.BrandId).Select(n => new MenuCategoryVM()
                                {
                                    Name = n.Category.Name,
                                    CatId = n.Id
                                }).ToList();
                            }
                            listCategory.Add(rootCat);
                        }
                    }
                    brandvm.Categories = listCategory;

                }
                //brands.RemoveRange(1, brands.Count - 1);
                return PartialView("_TopMenu", brands.ToList());
            }

        }

        [ChildActionOnly]
        public ActionResult SideBar()
        {
            List<TopMenuVM> brands = null;
            using (DatisEntities de = new DatisEntities())
            {
                brands = de.Brands.Select(m => new TopMenuVM()
                {
                    BrandName = m.Name,
                    BrandId = m.Id
                }).ToList();
                foreach (var brandvm in brands)
                {
                    var brandCats = de.BrandCategories.Where(x => x.BrandId == brandvm.BrandId).ToList();
                    var cats = de.BrandCategories.Where(x => x.BrandId == brandvm.BrandId).Select(m => m.Category).ToList();
                    var listCategory = new List<MenuCategoryVM>();
                    foreach (var bcat in brandCats)
                    {
                        if (bcat.Category.ParentId == null)
                        {
                            var rootCat = new MenuCategoryVM()
                            {
                                CatId = bcat.Id,
                                Name = bcat.Category.Name
                            };
                            List<int?> childs = new List<int?>();
                            childs = de.CategoryChildrens.Where(p => p.ParentId == bcat.Category.Id).Select(z => z.ChildId).ToList();
                            rootCat.Children = de.BrandCategories.Where(m => childs.Contains(m.CategoryId) && m.BrandId == brandvm.BrandId).Select(n => new MenuCategoryVM()
                            {
                                Name = n.Category.Name,
                                CatId = n.Id
                            }).ToList();
                            foreach (var item in rootCat.Children)
                            {
                                List<int?> childs2 = new List<int?>();
                                childs2 = de.CategoryChildrens.Where(p => p.ParentId == item.CatId).Select(z => z.ChildId).ToList();
                                item.Children = de.BrandCategories.Where(m => childs2.Contains(m.CategoryId) && m.BrandId == brandvm.BrandId).Select(n => new MenuCategoryVM()
                                {
                                    Name = n.Category.Name,
                                    CatId = n.Id
                                }).ToList();
                            }
                            listCategory.Add(rootCat);
                        }
                    }
                    brandvm.Categories = listCategory;

                }
                //brands.RemoveRange(1, brands.Count - 1);
                return PartialView("_SideBar", brands.ToList());
            }
            //return PartialView("_SideBar");

        }
    }
}
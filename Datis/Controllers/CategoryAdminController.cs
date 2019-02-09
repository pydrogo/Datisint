using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Models;
using Datis.Common;
using Datis.Data;
using System.Data.Entity.Validation;
namespace Datis.Controllers
{
    [Authorize(Roles = "CategoryAdmin")]
    public class CategoryAdminController : Controller
    {
        //
        // GET: /BrandAdmin/

        public ActionResult AjaxRead(CategorySearchVM searchOptions, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var all = pe.Categories.Where(x => (x.Name.Contains(searchOptions.Name) || searchOptions.Name == null)).Select(m => new CategoryVM()
                {
                    Id = m.Id,
                    Name = m.Name,
                    ParentId = m.ParentId ?? 0
                    //BrandsIds = m.BrandCategories.Select(n=>n.BrandId).ToList()
                });
                
                var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();
                foreach (var categoryVM in result)
                {
                    categoryVM.BrandsIds = pe.BrandCategories.Where(p=>p.CategoryId==categoryVM.Id).Select(n => n.BrandId).ToList();
                }
                return this.Store(result, all.Count());
            }
        }

        [HttpPost, ValidateInput(false)]
        public ActionResult Save(Category categoryModel,List<int> BrandsIds)
        {
            //var a = Request.Form[0];
            if (!ModelState.IsValid)
            {
                var result = new
                {
                    success = false,
                    message = Utils.GetModelStateErrorList(ModelState)
                };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            else
            {
                using (DatisEntities de = new DatisEntities())
                {
                    if (categoryModel.Id > 0)
                    {
                        //var record = PradaEntities.AnalogBoxes.Where(m => m.Id == analogBoxModel.Id).FirstOrDefault();
                        //record = analogBoxModel;
                        try
                        {
                            var res = de.BrandCategories.Where(m => m.CategoryId == categoryModel.Id);
                            foreach (var brandCategory in res)
                            {
                                de.BrandCategories.Remove(brandCategory);
                            }
                            de.SaveChanges();
                            foreach (int brandId in BrandsIds)
                            {
                                BrandCategory bc = new BrandCategory()
                                {
                                    BrandId = brandId,
                                    CategoryId = categoryModel.Id
                                };
                                de.BrandCategories.Add(bc);
                            }
                            de.SaveChanges();
                            //analogBoxModel.InsertDateTime = DateTime.Now;
                            de.Entry(categoryModel).State = System.Data.Entity.EntityState.Modified;
                            de.SaveChanges();
                        }
                        catch (DbEntityValidationException e)
                        {
                            foreach (var eve in e.EntityValidationErrors)
                            {
                                //Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                                //    eve.Entry.Entity.GetType().Name, eve.Entry.State);
                                foreach (var ve in eve.ValidationErrors)
                                {
                                    var result1 = new
                                    {
                                        success = false,
                                        message = ve.PropertyName + ve.ErrorMessage
                                    };
                                    //Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                                    //    ve.PropertyName, ve.ErrorMessage);
                                }
                            }
                            throw;
                        }
                        var result = new
                        {
                            success = true,
                            message = "ویرایش اطلاعات با موفقیت انجام شد",
                            data = new { Id = categoryModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);

                    }

                    else
                    {
                        //analogBoxModel.InsertDateTime = DateTime.Now;
                        
                        de.Categories.Add(categoryModel);
                        de.SaveChanges();
                        var cch = new CategoryChildren()
                        {
                            ParentId = categoryModel.ParentId,
                            ChildId = categoryModel.Id
                        };
                        de.CategoryChildrens.Add(cch);
                        de.SaveChanges();
                        foreach (int brandId in BrandsIds)
                        {
                            BrandCategory bc = new BrandCategory()
                            {
                                BrandId = brandId,
                                CategoryId = categoryModel.Id
                            };
                            de.BrandCategories.Add(bc);
                        }
                        de.SaveChanges();
                        var result = new
                        {
                            success = true,
                            message = "ثبت اطلاعات با موفقیت انجام شد",
                            data = new { Id = categoryModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }
        [HttpDelete]
        public ActionResult Delete(int Id)
        {
            using (DatisEntities de = new DatisEntities())
            {
                var record = de.Categories.FirstOrDefault(m => m.Id == Id);
                de.Categories.Remove(record);
                de.SaveChanges();
                var result = new
                {
                    success = true,
                    message = "حذف اطلاعات با موفقیت انجام شد"
                };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Lookup()
        {
            using (var de = new DatisEntities())
            {
                var result = de.Brands.Select(m => new
                {
                    Id = m.Id,
                    Title = m.Name
                }).ToList();

                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult CategoryLookup()
        {
            using (var de = new DatisEntities())
            {
                var result = de.Categories.Select(m => new
                {
                    Id = m.Id,
                    Title = m.Name
                }).ToList();

                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

    }
}

using Datis.Common;
using Datis.Data;
using Datis.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Datis.Controllers
{
    public class SolutionController : Controller
    {
        public ActionResult Index()
        {
            using (DatisEntities de = new DatisEntities())
            {
                var res = de.Solutions.Select(m => new TermsOfGarrantyVM()
                {
                    Id = m.Id,
                    Name = m.Name,
                    Description = m.Description,
                    Details = m.Details,
                    Image = de.Images.FirstOrDefault(x => x.ProductId == m.Id && x.TableId == (int)DatisEnums.TableId.Solution).Path
                }).ToList();

                return View(res);
            }
        }
        public ActionResult Details(int id)
        {
            using (DatisEntities de = new DatisEntities())
            {
                var res = de.Solutions.Where(n => n.Id == id).Select(m => new TermsOfGarrantyVM()
                {
                    Id = m.Id,
                    Name = m.Name,
                    Description = m.Description,
                    Details = m.Details,
                    Image = de.Images.FirstOrDefault(x => x.ProductId == m.Id && x.TableId == (int)DatisEnums.TableId.Solution).Path
                }).FirstOrDefault();

                return View(res);
            }
        }
       [Authorize(Roles = "Solution")]
        public ActionResult AjaxRead(TermsOfGarrantySearchVM searchOptions, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var all = pe.Solutions.Where(x => (x.Name.Contains(searchOptions.Name) || searchOptions.Name == null)
                    && (x.Description.Contains(searchOptions.Description) || searchOptions.Description == null)).Select(m => new TermsOfGarrantyVM()
                {
                    Id = m.Id,
                    Name = m.Name,
                    Description = m.Description,
                    Details = m.Details
                });
                var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();

                return this.Store(result, all.Count());
            }
        }

        [HttpPost, ValidateInput(false)]
        [Authorize(Roles = "Solution")]
        public ActionResult Save(Solution termModel)
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
                    if (termModel.Id > 0)
                    {
                        //var record = PradaEntities.AnalogBoxes.Where(m => m.Id == analogBoxModel.Id).FirstOrDefault();
                        //record = analogBoxModel;
                        try
                        {
                            //analogBoxModel.InsertDateTime = DateTime.Now;
                            de.Entry(termModel).State = System.Data.Entity.EntityState.Modified;
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
                            data = new { Id = termModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);

                    }

                    else
                    {
                        //analogBoxModel.InsertDateTime = DateTime.Now;

                        de.Solutions.Add(termModel);
                        de.SaveChanges();
                        var result = new
                        {
                            success = true,
                            message = "ثبت اطلاعات با موفقیت انجام شد",
                            data = new { Id = termModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }
        [HttpDelete]
        [Authorize(Roles = "Solution")]
        public ActionResult Delete(int Id)
        {
            using (DatisEntities de = new DatisEntities())
            {
                var record = de.Solutions.FirstOrDefault(m => m.Id == Id);
                de.Solutions.Remove(record);
                de.SaveChanges();
                var result = new
                {
                    success = true,
                    message = "حذف اطلاعات با موفقیت انجام شد"
                };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
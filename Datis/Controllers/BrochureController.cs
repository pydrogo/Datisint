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
    public class BrochureController : Controller
    {
        public ActionResult Index()
        {
            using (DatisEntities de = new DatisEntities())
            {
                var res = de.SiteContents.Where(m => m.ArticleType == (int)DatisEnums.ArticleType.Brochure).Select(x => new ArticleVM()
                {
                    Id = x.Id,
                    Title = x.Title,
                    Details = x.Article,
                    Image = de.Images.FirstOrDefault(n => n.TableId == (int)DatisEnums.TableId.Brochure && n.ForeignId == x.Id).Path,
                    File = de.Files.FirstOrDefault(n => n.TableId == (int)DatisEnums.TableId.Brochure && n.ForeignId == x.Id).Path,
                    HasFile = de.Files.Any(n => n.TableId == (int)DatisEnums.TableId.Brochure && n.ForeignId == x.Id),
                    FileTypeLogo = de.Files.FirstOrDefault(n => n.TableId == (int)DatisEnums.TableId.Brochure && n.ForeignId == x.Id).Extension == ".zip" ? "Images/zip-icon.png"
                    : de.Files.FirstOrDefault(n => n.TableId == (int)DatisEnums.TableId.Brochure && n.ForeignId == x.Id).Extension == ".pdf" ? "Images/pdf-icon.png" : "Images/file-icon.png"
                }).ToList();
                foreach (var item in res)
                {
                    item.Image200 = item.Image.AddDirectoryToPath("200");
                    item.Image350 = item.Image.AddDirectoryToPath("350");
                    item.Image60 = item.Image.AddDirectoryToPath("60");
                }
                return View(res);
            }
        }

        public ActionResult Details(int Id)
        {
            using (DatisEntities de = new DatisEntities())
            {
                SiteContent sc = de.SiteContents.Where(m => m.ArticleType == (int)DatisEnums.ArticleType.Brochure).FirstOrDefault();
                var res = new ArticleDetailasVM()
                {
                    Id = sc.Id,
                    Title = sc.Title,
                    Details = sc.Article,
                    Files = de.Files.Where(m => m.ForeignId == sc.Id && m.TableId == (int)DatisEnums.TableId.Brochure)
                    .Select(n => new { n.Path, n.Name })
                    .AsEnumerable()
                    .Select(n => new Tuple<string, string>(n.Path, n.Name))
                    .ToList()
                };
                return View(res);
            }
        }

        [Authorize(Roles = "Brochure")]
        public ActionResult AjaxRead(TermsOfGarrantySearchVM searchOptions, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var all = pe.SiteContents.Where(x => (x.Title.Contains(searchOptions.Name) || searchOptions.Name == null)
                    && (x.Article.Contains(searchOptions.Description) || searchOptions.Description == null)
                    && x.ArticleType == (int)DatisEnums.ArticleType.Brochure).Select(m => new SiteContentVM()
                {
                    Id = m.Id,
                    Title = m.Title,
                    Article = m.Article
                });
                var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();

                return this.Store(result, all.Count());
            }
        }

        [HttpPost, ValidateInput(false)]
        [Authorize(Roles = "Brochure")]
        public ActionResult Save(SiteContent siteContentModel)
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
                    if (siteContentModel.Id > 0)
                    {
                        //var record = PradaEntities.AnalogBoxes.Where(m => m.Id == analogBoxModel.Id).FirstOrDefault();
                        //record = analogBoxModel;
                        try
                        {
                            siteContentModel.ArticleType = (int)DatisEnums.ArticleType.Brochure;
                            de.Entry(siteContentModel).State = System.Data.Entity.EntityState.Modified;
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
                            data = new { Id = siteContentModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        siteContentModel.ArticleType = (int)DatisEnums.ArticleType.Brochure;
                        de.SiteContents.Add(siteContentModel);
                        de.SaveChanges();
                        var result = new
                        {
                            success = true,
                            message = "ثبت اطلاعات با موفقیت انجام شد",
                            data = new { Id = siteContentModel.Id }
                        };
                        return Json(result, JsonRequestBehavior.AllowGet);
                    }
                }
            }
        }
        [HttpDelete]
        [Authorize(Roles = "Brochure")]
        public ActionResult Delete(int Id)
        {
            using (DatisEntities de = new DatisEntities())
            {
                var record = de.SiteContents.FirstOrDefault(m => m.Id == Id);
                de.SiteContents.Remove(record);
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
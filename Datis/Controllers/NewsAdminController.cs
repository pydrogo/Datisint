using System.Linq;
using System.Web.Mvc;
using System.Data.Entity.Validation;
using Datis.Common;
using Datis.Data;
using Datis.Models;

namespace Datis.Controllers
{
    [Authorize(Roles = "NewsAdmin")]
    public class NewsAdminController : Controller
    {
        //
        // GET: /AnalogBoxAdmin/
        public ActionResult AjaxRead(TermsOfGarrantySearchVM searchOptions, StoreRequestParams parameters)
        {
            var pe = new DatisEntities();
            var all = pe.SiteContents.Where(x => (x.Title.Contains(searchOptions.Name) || searchOptions.Name == null)
                                                 &&
                                                 (x.Article.Contains(searchOptions.Description) || searchOptions.Description == null)
                                                  && x.ArticleType == (int)DatisEnums.ArticleType.NewsRoom);
            var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();

            return this.Store(result, all.Count());

        }

        [HttpPost, ValidateInput(false)]
        public ActionResult Save(SiteContent siteContentModel)
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
            else
            {
                var de = new DatisEntities();
                if (siteContentModel.Id > 0)
                {
                    //var record = PradaEntities.AnalogBoxes.Where(m => m.Id == analogBoxModel.Id).FirstOrDefault();
                    //record = analogBoxModel;
                    try
                    {
                        siteContentModel.ArticleType = (int)DatisEnums.ArticleType.NewsRoom;
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
                    siteContentModel.ArticleType = (int)DatisEnums.ArticleType.NewsRoom;
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
        [HttpDelete]
        public ActionResult Delete(long Id)
        {
            using (var db = new DatisEntities())
            {
                var record = db.SiteContents.FirstOrDefault(m => m.Id == Id);
                db.SiteContents.Remove(record);
                db.SaveChanges();
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

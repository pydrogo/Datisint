using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Datis.Common;
using Datis.Data;
using Datis.Models;

namespace Datis.Controllers
{
    public class NewsController : Controller
    {
        //
        // GET: /Blog/
        public ActionResult Index()
        {
            using (var db = new DatisEntities())
            {
                var result = db.SiteContents.Where(m => m.ArticleType == (int)DatisEnums.ArticleType.NewsRoom).Select(x => new NewsVM()
                {
                    Id = x.Id,
                    Description = x.Description,
                    Title = x.Title,
                    Article = x.Article,
                    NewsDate = x.NewsDate,
                    Image = db.Images.FirstOrDefault(n => n.ProductId == x.Id && n.TableId == (int)DatisEnums.TableId.SiteContent).Path
                }).ToList();
                foreach (var item in result)
                {
                    item.Image = item.Image.AddDirectoryToPath("350");
                }
                return View(result);
            }
        }

        public ActionResult Details(int Id)
        {
            using (var db = new DatisEntities())
            {
                var result = db.SiteContents.Where(m => m.ArticleType == (int)DatisEnums.ArticleType.NewsRoom && m.Id == Id).Select(x => new NewsVM()
                {
                    Id = x.Id,
                    Description = x.Description,
                    Title = x.Title,
                    Article = x.Article,
                    NewsDate = x.NewsDate,
                    Image = db.Images.FirstOrDefault(n => n.ProductId == x.Id && n.TableId == (int)DatisEnums.TableId.SiteContent).Path
                }).FirstOrDefault();
                return View(result);
            }
        }

        public ActionResult GetNewsPartial()
        {
            using (var de = new DatisEntities())
            {
                ViewBag.LastNews = de.SiteContents.Where(m => m.ArticleType == (int)DatisEnums.ArticleType.NewsRoom).Select(x => new NewsVM()
                {
                    Id = x.Id,
                    Description = x.Description,
                    Title = x.Title,
                    Article = x.Article,
                    NewsDate = x.NewsDate,
                    Image = de.Images.FirstOrDefault(n => n.ProductId == x.Id && n.TableId == (int)DatisEnums.TableId.SiteContent).Path
                }).Take(6).ToList();
            }
            foreach (var item in (List<NewsVM>)ViewBag.LastNews)
            {
                item.Image = !string.IsNullOrEmpty(item.Image) ? item.Image.AddDirectoryToPath("200") : "";
            }
            return PartialView("_NewsFooter");
        }
        //public ActionResult NewRelease(int? year)
        //{
        //    using (var db = new DatisEntities())
        //    {
        //        var result = db.SiteContents
        //            .Where(m => m.ArticleType == (int)DatisEnums.ArticleType.NewsRoom && m.Category == 1 && m.NewsDate.HasValue && ((year == null && m.NewsDate.Value.Year == DateTime.Now.Year) || m.NewsDate.Value.Year == year))
        //            .OrderByDescending(x => x.NewsDate).ToList();
        //        var years = db.SiteContents.Where(m => m.NewsDate.HasValue && m.Category == 1).GroupBy(m => m.NewsDate.Value.Year).OrderByDescending(x => x.Key).ToList();
        //        var ExistedYears = new List<SelectListItem>();
        //        foreach (var item in years)
        //        {
        //            ExistedYears.Add(new SelectListItem { Text = item.Key.ToString(), Value = item.Key.ToString() });
        //        }
        //        ViewBag.ListOfYears = ExistedYears;
        //        return View(result);
        //    }
        //}
        //public ActionResult EventSchedule(int? year)
        //{
        //    using (var db = new DatisEntities())
        //    {
        //        var result = db.SiteContents
        //            .Where(m => m.ArticleType == (int)DatisEnums.ArticleType.NewsRoom && m.Category == 2 && m.NewsDate.HasValue && ((year == null && m.NewsDate.Value.Year == DateTime.Now.Year) || m.NewsDate.Value.Year == year))
        //            .OrderByDescending(x => x.NewsDate).ToList();
        //        var years = db.SiteContents.Where(m => m.NewsDate.HasValue && m.Category == 2).GroupBy(m => m.NewsDate.Value.Year).OrderByDescending(x => x.Key).ToList();
        //        var ExistedYears = new List<SelectListItem>();
        //        foreach (var item in years)
        //        {
        //            ExistedYears.Add(new SelectListItem { Text = item.Key.ToString(), Value = item.Key.ToString() });
        //        }
        //        ViewBag.ListOfYears = ExistedYears;
        //        return View(result);
        //    }
        //}
    }
}
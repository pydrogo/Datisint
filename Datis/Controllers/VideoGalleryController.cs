using Datis.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Data;

namespace Datis.Controllers
{
    public class VideoGalleryController : Controller
    {
        //
        // GET: /ImageGallery/
        public ActionResult Index()
        {
            //Dictionary<String, List<String>> d = new Dictionary<string, List<string>>();
            //var dirConfig = new DirectoryInfo(Server.MapPath("~/FileManager/upload/VideoGallery"));
            //var allFiles = dirConfig.GetFiles("*");
            string[] FileNames = Directory.GetFiles(Server.MapPath("~/FileManager/upload/VideoGallery"));
            var fileGroups = from f in FileNames
                             group f by Path.GetFileNameWithoutExtension(f) into g
                             select new { Name = g.Key, Files = g };
            //foreach (var fileInfo in allFiles)
            //{
            //    String coreName = Path.GetFileNameWithoutExtension(fileInfo.Name);
            //    if (!d.ContainsKey(coreName)) d.Add(coreName, new List<String>());
            //    d[coreName].Add(fileInfo.Extension);
            //}

            //List<string> images = new List<string>();
            //foreach (string s in Directory.GetFiles(Server.MapPath("~/FileManager/upload/VideoGallery")).Select(Path.GetFileName))
            //{
            //    images.Add("FileManager/upload/VideoGallery/" + s);
            //}
            List<VideoVM> lv = new List<VideoVM>();
            foreach (var g in fileGroups)
            {
                VideoVM vv = new VideoVM();
                // initialize zip file
                foreach (var fname in g.Files)
                {
                    // add fname to zip
                    var extension = Path.GetExtension(fname);
                    var fileName = Path.GetFileName(fname);
                    if (extension != null && (extension.ToLower() == ".png" || extension.ToLower() == ".jpg" ||
                                                             extension.ToLower() == ".jpeg" || extension.ToLower() == ".gif" ||
                                                             extension.ToLower() == ".svg"))
                    {
                        vv.Image = "FileManager/upload/VideoGallery/" + fileName;
                    }

                    if (extension != null && (extension.ToLower() == ".wav" || extension.ToLower() == ".mov" || extension.ToLower() == ".mp4" || extension.ToLower() == ".flv"))
                    {
                        vv.Video = "FileManager/upload/VideoGallery/" + fileName;
                    }
                    using (var de = new DatisEntities())
                    {
                        if (de.FileManagerFiles.Any(m => m.FileName == fileName))
                        {
                            var fileManagerFile = de.FileManagerFiles.FirstOrDefault(m => m.FileName == fileName);
                            vv.TitleOrUrl =
                                fileManagerFile != null ? fileManagerFile.TitleOrUrl : "داتیس";
                        }
                        else
                        {
                            vv.TitleOrUrl =  "داتیس";
                        }
                    }
                }
                lv.Add(vv);
            }
            return View(lv);
        }

        [Route("Video/{name}")]
        public ActionResult Single(string name)
        {
            string[] fileNames = Directory.GetFiles(Server.MapPath("~/FileManager/upload/VideoGallery"));
            var fileGroups = from f in fileNames
                             group f by Path.GetFileNameWithoutExtension(f) into g
                             select new { Name = g.Key, Files = g };
            VideoVM vv = new VideoVM();
            foreach (var g in fileGroups)
            {
                foreach (var fname in g.Files)
                {
                    var nameWithoutExtension = Path.GetFileNameWithoutExtension(fname);
                    if (nameWithoutExtension != null && String.Equals(nameWithoutExtension, name, StringComparison.CurrentCultureIgnoreCase))
                    {
                        var extension = Path.GetExtension(fname);
                        var fileName = Path.GetFileName(fname);
                        if (extension != null && (extension.ToLower() == ".png"
                            || extension.ToLower() == ".jpg"
                            || extension.ToLower() == ".jpeg"
                            || extension.ToLower() == ".gif"
                            || extension.ToLower() == ".svg"))
                        {
                            vv.Image = "FileManager/upload/VideoGallery/" + fileName;
                        }
                        if (extension != null && (extension.ToLower() == ".wav" || extension.ToLower() == ".mov" || extension.ToLower() == ".mp4" || extension.ToLower() == ".flv"))
                        {
                            vv.Video = "FileManager/upload/VideoGallery/" + fileName;
                        }
                        using (var de = new DatisEntities())
                        {
                            if (de.FileManagerFiles.Any(m => m.FileName == fileName))
                            {
                                var fileManagerFile = de.FileManagerFiles.FirstOrDefault(m => m.FileName == fileName);
                                vv.TitleOrUrl =
                                    fileManagerFile != null ? fileManagerFile.TitleOrUrl : "داتیس";
                            }
                        }
                    }
                }
            }
            return View(vv);
        }
    }
}
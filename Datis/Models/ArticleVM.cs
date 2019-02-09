using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class ArticleVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public string Image { get; set; }
        public string Image200 { get; set; }
        public string Image350 { get; set; }
        public string Image60 { get; set; }
        public string File { get; set; }
        public string FileTypeLogo { get; set; }
        public bool HasFile { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class ArticleDetailasVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public List<Tuple<string,string>> Files { get; set; }

    }
}
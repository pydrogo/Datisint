using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class CategoryPageVM
    {

        public List<BrandCategoryVM> Cats { get; set; }
        public string ParentName { get; set; }
    }
}
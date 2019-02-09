using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class MenuCategoryVM
    {
        public int CatId { get; set; }
        public string Name { get; set; }
        public List<MenuCategoryVM> Children { get; set; }
    }
}
using Datis.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class TopMenuVM
    {
        public string BrandName { get; set; }
        public int BrandId { get; set; }
        public List<MenuCategoryVM> Categories { get; set; }
    }
}
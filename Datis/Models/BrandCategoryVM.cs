using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class BrandCategoryVM
    {
        public int Id { get; set; }
        public int CatId { get; set; }
        public int BrandId { get; set; }
        public string CatName { get; set; }
        public string BrandName { get; set; }
        public string CatLogo { get; set; }
        public string BrandLogo { get; set; }


    }
}
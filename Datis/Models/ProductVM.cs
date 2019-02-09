using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class ProductVM
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public int BrandCategoryId { get; set; }
        public string FeaturesSummary { get; set; }
        public string Description { get; set; }
        public string Summary { get; set; }
        public string MainImage { get; set; }
        public string MainImage200 { get; set; }
        public string MainImage350 { get; set; }
        public string MainImage60 { get; set; }
        public string BrandName { get; set; }
        public string BrandLogo { get; set; }
        public string CategoryName { get; set; }
        public List<ProductImageVM> AllImages { get; set; }
        public List<KeyValuePair<string, string>> Files { get; set; }
        public List<Tuple<string,string>> Features { get; set; }
        public string Link { get; set; }


    }
}
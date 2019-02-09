using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class FeatureValuesVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public int CategoryId { get; set; }
        public int BrandCategoryId { get; set; }
        public int FeatureId { get; set; }
        public int ProductId { get; set; }
        


    }
}
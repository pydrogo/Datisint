using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class CategoryVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CategoryVM Parent { get; set; }
        public List<BrandVM> Brands { get; set; }
        public List<int?> BrandsIds { get; set; }
        public int ParentId { get; set; }
        public string ParentName { get; set; }
        public string Logo { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class FeatureVM
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CategoryName { get; set; }
        public int CategoryId { get; set; }

    }
}
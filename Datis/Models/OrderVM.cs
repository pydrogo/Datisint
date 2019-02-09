using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class OrderVM
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Tedad { get; set; }
        public string Tarikh { get; set; }
    }
}
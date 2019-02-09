using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class SerialNumberVM
    {
        public int Id { get; set; }
        public string SerialNumber { get; set; }
        public DateTime InsertDate1 { get; set; }
        public string InsertDate { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string Product { get; set; }
        public string BuyDate { get; set; }
        public string Description { get; set; }
    }
}
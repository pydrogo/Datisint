using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class RepairVM
    {
        public int Id { get; set; }
        public string TamirOrMarjoo { get; set; }
        public string NameSherkat { get; set; }
        public string NameMasool { get; set; }
        public string Ostan { get; set; }
        public string Shahrestan { get; set; }
        public string CodePosti { get; set; }
        public string Tel { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string ModelDastgah { get; set; }
        public string ShomareSerialDastgah { get; set; }
        public string ShomareFactor { get; set; }
        public string FactorDate { get; set; }
        public string Address { get; set; }
        public string Eshkal { get; set; }
    }
}
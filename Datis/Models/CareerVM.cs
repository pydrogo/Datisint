using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class CareerVM
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string CodeMelli { get; set; }
        public string ResumeFilePath { get; set; }
    }
}
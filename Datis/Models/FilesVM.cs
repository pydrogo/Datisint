using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class FilesVM
    {
        public long id { get; set; }
        public string adress { get; set; }
        public string typeOfFile { get; set; }
        public string name { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datis.Common
{
    public static class Extensions
    {
        public static string AddDirectoryToPath(this string str,string path)
        {
            string dir = Path.GetDirectoryName(str);
            dir += "\\" + path + "\\";
            string fname =str !=null ? Path.GetFileName(str):"";
            return Path.Combine(dir, fname);
        }
    }
}

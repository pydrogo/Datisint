using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Policy;
using System.Web;
using System.Web.Hosting;

namespace Datis
{
    public class Helpers
    {
        public static string GetHeaderIamge(string pageName)
        {

            try
            {
                string root = HostingEnvironment.ApplicationPhysicalPath;
                var pathMainPart = pageName == "GarrantyStatus"
                                   || pageName == "Repair"
                                   || pageName == "ProductReturn"
                                   || pageName == "TermsOfGarranty"
                    ? "../FileManager/upload/"
                    : "FileManager/upload/";
                var imagePath =
                    Directory.GetFiles(Path.Combine(root, "FileManager/upload/" + pageName))
                        .Select(Path.GetFileName)
                        .FirstOrDefault();
                return string.IsNullOrEmpty(imagePath) ? "" : string.Format("<img style='width:100%;height:100%' src={0} />", Path.Combine(pathMainPart, pageName, imagePath));
            }
            catch (Exception)
            {

            }
            return "";
        }
    }
}
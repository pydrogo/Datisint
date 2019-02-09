using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datis.Data
{
    public class DatisEnums
    {
        public enum TableId
        {
            Brand = 1,
            Product = 2,
            Category = 3,
            Article = 4,
            Brochure = 5,
            Application = 6,
            SiteContent = 99,
            Technology = 7,
            Solution = 8
        }
        public enum ImgeType
        {
            Main = 1,
            Other = 2
        }
        public enum ArticleType
        {
            DarbareDatis = 1,
            TamasBaMa = 2,
            ReturnProduct = 3,
            Projects = 4,
            Faq = 5,
            Blog = 6,
            Brochure = 7,
            Application = 8,
            NewsRoom = 9,
            Technology = 10
        }
    }
}

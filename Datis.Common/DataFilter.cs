using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datis.Common
{
    public class DataFilter
    {
        public DataFilter() {
            Value = "";
            Property = "";
            ExactMatch = false;
            CaseSensitive = false;
            AnyMatch = false;
        }

        public bool AnyMatch { get; set; }

        public bool CaseSensitive { get; set; }

        public bool ExactMatch { get; set; }

        public string Property { get; set; }

        public string Value { get; set; }
    }
}

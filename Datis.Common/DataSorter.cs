using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datis.Common
{
    public class DataSorter
    {
        private SortDirection _direction = SortDirection.Default;

        [DefaultValue(SortDirection.Default)]
        [Description("The direction to sort by. Defaults to ASC")]
        public SortDirection Direction {
            get { return _direction; }
            set { _direction = value; }
        }

        private string _property = "";

        [Description("The property to sort by. Required unless sorterFn is provided")]
        [DefaultValue("")]
        public virtual string Property {
            get { return _property; }
            set { _property = value; }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class TreeMenuItem
    {
        public string iconCls { get; set; }
        public string text { get; set; }
        public string viewPath { get; set; }
        public string leaf { get; set; }
        public string expanded { get; set; }
        public string url { get; set; }
        public List<TreeMenuItem> children { get; set; }

        public TreeMenuItem()
        {
            children = new List<TreeMenuItem>();
        }
    }
}
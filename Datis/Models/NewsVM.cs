﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class NewsVM
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Article { get; set; }

        public string Description { get; set; }

        public Nullable<System.DateTime> NewsDate { get; set; }

        public string Image { get; set; }
    }
}
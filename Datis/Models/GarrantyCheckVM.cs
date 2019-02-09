using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Datis.Models
{
    public class GarrantyCheckVM
    {

        [Required(ErrorMessage = "شماره سریال را وارد کنید")]
        [StringLength(100, MinimumLength = 3)]
        public string SerialNumber { get; set; }
        [Required(ErrorMessage = "مجموع را وارد کنید")]
        [StringLength(3, MinimumLength = 1)]
        public string Captcha { get; set; }
    }
}
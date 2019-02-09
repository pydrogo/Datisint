using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Datis.Data
{
    public class CareerMetadata
    {
        [ScaffoldColumn(false)]
        public long Id { get; set; }

        [DisplayName("نام")]
        [Required(ErrorMessage = "نام را وارد کنید")]
        [StringLength(400, MinimumLength = 2, ErrorMessage = "نام نادرست")]
        public string Name { get; set; }

        [DisplayName("نام خانوادگی")]
        [Required(ErrorMessage = "نام خانوادگی را وارد کنید")]
        [StringLength(400, MinimumLength = 2, ErrorMessage = "نام خانوادگی نادرست")]
        public string LastName { get; set; }

        [DisplayName("کد ملی")]
        [Required(ErrorMessage = "کد ملی را وارد کنید")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "کد ملی نادرست")]
        [RegularExpression("([0-9]+)",ErrorMessage="کد ملی نادرست، عدد وارد کنید")]
        public string CodeMelli { get; set; }


        [StringLength(4000)]
        public string ResumeFilePath { get; set; }

        [DisplayName("فایل رزومه")]
        [Required(ErrorMessage = "فایل رزومه انتخاب نشده است")]
        [DataType(DataType.Upload)]
        public HttpPostedFileBase ResumeFile { get; set; }

        [Required(ErrorMessage = "مجموع را وارد کنید")]
        [StringLength(3, MinimumLength = 1)]
        [RegularExpression("([0-9]+)",ErrorMessage="برای مجموع عدد وارد کنید")]
        public string Captcha { get; set; }
    }
}

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
    public class SerialNumberMetadata
    {
        [ScaffoldColumn(false)]
        public int Id { get; set; }
        
        [DisplayName("نام")]
        [Required(ErrorMessage = "نام را وارد کنید")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "نام نادرست")]
        public string Name { get; set; }
        
        [DisplayName("نام خانوادگی")]
        [Required(ErrorMessage = "نام خانوادگی را وارد کنید")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "نام خانوادگی نادرست")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "ایمیل را وارد کنید")]
        [DisplayName("ایمیل")]
        [StringLength(50, MinimumLength = 3)]
        [EmailAddress(ErrorMessage = "ایمیل نا معتبر")]
        public string Email { get; set; }

        [DisplayName("تلفن همراه به صورت 09111111111")]
        [Required(ErrorMessage = "شماره تلفن همراه را وارد کنید")]
        [StringLength(15, MinimumLength = 10, ErrorMessage = "شماره همراه نادرست")]
        public string Mobile { get; set; }

        [DisplayName("محصول(حتما محصول باید از لیست انتخاب شود)")]
        [Required(ErrorMessage = "محصول را وارد کنید")]
        [Range(0, int.MaxValue)]
        public int Product { get; set; }

        [DisplayName("سریال کالا")]
        [Required(ErrorMessage = "سریال کالا را وارد کنید")]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "سریال کالا نادرست")]
        public string Serial { get; set; }

        [DisplayName("توضیحات")]
        [StringLength(4000)]
        public string Description { get; set; }

        [DisplayName("تاریخ خرید به صورت 13950101")]
        [Required(ErrorMessage = "تاریخ خرید را وارد کنید")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "تاریخ خرید نادرست")]
        public string BuyDate { get; set; }

        public Nullable<System.DateTime> TarikheSabteDarkhast { get; set; }

        [Required(ErrorMessage = "مجموع را وارد کنید")]
        [StringLength(3, MinimumLength = 1)]
        [RegularExpression("([0-9]+)", ErrorMessage = "برای مجموع عدد وارد کنید")]
        public string Captcha { get; set; }
    }
}

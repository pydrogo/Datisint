using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datis.Data
{
    public class RepairMetadata
    {
        [ScaffoldColumn(false)]
        public int Id { get; set; }

        [DisplayName("نوع درخواست")]
        [Required(ErrorMessage = "نوع درخواست را انتخاب کنید")]
        [Range(0, 5)]
        public Nullable<int> TamirOrMarjoo { get; set; }

        [DisplayName("نام شرکت")]
        [Required(ErrorMessage = "نام شرکت را وارد کنید")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "نام شرکت نادرست")]
        public string NameSherkat { get; set; }

        [DisplayName("نام مسئول شرکت")]
        [Required(ErrorMessage = "نام مسئول شرکت را وارد کنید")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "نام مسئول نادرست")]
        public string NameMasool { get; set; }

        [DisplayName("استان")]
        [Required(ErrorMessage = "نام استان را انتخاب کنید")]
        [Range(1,100)]
        public int Ostan { get; set; }

        [DisplayName("شهرستان")]
        [Required(ErrorMessage = "نام شهرستان را انتخاب کنید")]
        [Range(1, 500, ErrorMessage = "لطفا شهرستان را دوباره انتخاب کند")]
        public int Shahrestan { get; set; }

        [DisplayName("کد پستی 10 رقمی")]
        [Required(ErrorMessage = "کد پستی را وارد کنید")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "کد پستی نادرست")]
        [StringLength(12, MinimumLength = 10, ErrorMessage = "کد پستی نادرست")]
        public string CodePosti { get; set; }

        [DisplayName("تلفن ثابت همراه با کد شهر")]
        [Required(ErrorMessage = "شماره تلفن ثابت را وارد کنید")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "شماره تلفن نادرست")]
        [StringLength(15, MinimumLength = 10, ErrorMessage = "شماره تلفن نادرست")]
        public string Tel { get; set; }

        [DisplayName("تلفن همراه به صورت 09111111111")]
        [Required(ErrorMessage = "شماره تلفن همراه را وارد کنید")]
        [RegularExpression("^[0-9]*$", ErrorMessage = "شماره همراه نادرست")]
        [StringLength(15, MinimumLength = 10, ErrorMessage = "شماره همراه نادرست")]
        public string Mobile { get; set; }


        [Required(ErrorMessage = "ایمیل را وارد کنید")]
        [DisplayName("ایمیل")]
        [StringLength(50, MinimumLength = 3)]
        [EmailAddress(ErrorMessage = "ایمیل نا معتبر")]
        public string Email { get; set; }

        [DisplayName("مدل دستگاه(حتما مدل دستگاه باید از لیست انتخاب شود)")]
        [Required(ErrorMessage = "مدل دستگاه را وارد کنید")]
        public string ModelDastgah { get; set; }

        [DisplayName("شماره سریال دستگاه")]
        [Required(ErrorMessage = "شماره سریال دستگاه را وارد کنید")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "شماره سریال دستگاه نادرست")]
        public string ShomareSerialDastgah { get; set; }

        [DisplayName("شماره فاکتور")]
        //[Required(ErrorMessage = "شماره فاکتور را وارد کنید")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "شماره فاکتور نادرست")]
        public string ShomareFactor { get; set; }

        [DisplayName("تاریخ فاکتور")]
        //[Required(ErrorMessage = "تاریخ فاکتور را وارد کنید")]
        [StringLength(10, MinimumLength = 10)]
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:yyyy/MM/dd}")]
        public string FactorDate { get; set; }

        [DisplayName("آدرس")]
        [Required(ErrorMessage = "آدرس را وارد کنید")]
        [StringLength(200, MinimumLength = 10, ErrorMessage = "آدرس بسیار کوتاه یا بسیار طولانی است")]
        public string Address { get; set; }

        [DisplayName("شرح مشکل")]
        [Required(ErrorMessage = "شرح مشکل را وارد کنید")]
        [StringLength(500, MinimumLength = 10,ErrorMessage="توضیحات کافی نیست")]
        public string Eshkal { get; set; }

        [Required(ErrorMessage = "مجموع را وارد کنید")]
        [StringLength(3, MinimumLength = 1)]
        public string Captcha { get; set; }
    }
}

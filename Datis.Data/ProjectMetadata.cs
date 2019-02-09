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
    public class ProjectMetadata
    {
        [ScaffoldColumn(false)]
        public int Id { get; set; }
        
        [DisplayName("نام شرکت/فروشگاه")]
        [Required(ErrorMessage = "نام شرکت/فروشگاه را وارد کنید")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "نام شرکت/فروشگاه نادرست")]
        public string NameSherkatForushgah { get; set; }
        
        [DisplayName("نام مدیرعامل/مسئول")]
        [Required(ErrorMessage = "نام مدیرعامل/مسئول را وارد کنید")]
        [StringLength(50, MinimumLength = 3, ErrorMessage = "نام مدیرعامل/مسئول نادرست")]
        public string NameModiramelMasool { get; set; }

        [Required(ErrorMessage = "ایمیل را وارد کنید")]
        [DisplayName("ایمیل")]
        [StringLength(50, MinimumLength = 3)]
        [EmailAddress(ErrorMessage = "ایمیل نا معتبر")]
        public string Email { get; set; }

        [DisplayName("استان")]
        [Required(ErrorMessage = "نام استان را انتخاب کنید")]
        [Range(1, 100,ErrorMessage="لطفا استان را دوباره انتخاب کند")]
        public int Ostan { get; set; }
        
        [DisplayName("شهرستان")]
        [Required(ErrorMessage = "نام شهرستان را انتخاب کنید")]
        [Range(1, 500, ErrorMessage = "لطفا شهرستان را دوباره انتخاب کند")]
        public int Shahrestan { get; set; }
        
        [DisplayName("آدرس")]
        [Required(ErrorMessage = "آدرس را وارد کنید")]
        [StringLength(200, MinimumLength = 10, ErrorMessage = "آدرس بسیار کوتاه یا بسیار طولانی است")]
        public string Address { get; set; }

        [DisplayName("تلفن همراه به صورت 09111111111")]
        [Required(ErrorMessage = "شماره تلفن همراه را وارد کنید")]
        [StringLength(15, MinimumLength = 10, ErrorMessage = "شماره همراه نادرست")]
        public string Mobile { get; set; }

        [DisplayName("شماره تلفن ثابت به صورت 02111111111")]
        [Required(ErrorMessage = "شماره تلفن ثابت را وارد کنید")]
        [StringLength(15, MinimumLength = 10, ErrorMessage = "شماره تلفن ثابت نادرست")]
        public string Tel { get; set; }

        [DisplayName("تاریخ ثبت پروژه به صورت 13950101")]
        [Required(ErrorMessage = "تاریخ ثبت پروژه را وارد کنید")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "تاریخ ثبت پروژه نادرست")]
        public string TarikheSabteProject { get; set; }

        [DisplayName("تاریخ تضمین اجرا به صورت 13950101")]
        [Required(ErrorMessage = "تاریخ تضمین اجرا را وارد کنید")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "تاریخ ثتضمین اجرا نادرست")]
        public string TarikheTakhmineEjra { get; set; }

        [DisplayName("نام پروژه")]
        [Required(ErrorMessage = "نام پروژه را وارد کنید")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "نام پروژه نادرست")]
        public string ProjectName { get; set; }

        [DisplayName("استان پروژه")]
        [Required(ErrorMessage = "استان پروژه را وارد کنید")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "استان پروژه نادرست")]
        public string OstaneProject { get; set; }

        [DisplayName("شهر پروژه")]
        [Required(ErrorMessage = "شهر پروژه را وارد کنید")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "شهر پروژه نادرست")]
        public string ShahreProject { get; set; }

        [DisplayName("آدرس پروژه")]
        [Required(ErrorMessage = "آدرس پروژه را وارد کنید")]
        [StringLength(200, MinimumLength = 10, ErrorMessage = "آدرس پروژه بسیار کوتاه یا بسیار طولانی است")]
        public string AddressProject { get; set; }


        [DisplayName("مهندسی قبل از فروش")]
        public bool MohandesiGhablAzForush { get; set; }

        [DisplayName("اجرا")]
        public bool Ejra { get; set; }

        [DisplayName("نقشه کشی")]
        public bool NaghsheKeshi { get; set; }

        [DisplayName("مشاوره پروژه")]
        public bool MoshavereProject { get; set; }

        [DisplayName("جانمایی")]
        public bool Janamayi { get; set; }

        [DisplayName("بازرسی و نظارت بر اجرا")]
        public bool Nezarat { get; set; }

        [Required(ErrorMessage = "مجموع را وارد کنید")]
        [StringLength(3, MinimumLength = 1)]
        [RegularExpression("([0-9]+)", ErrorMessage = "برای مجموع عدد وارد کنید")]
        public string Captcha { get; set; }
    }
}

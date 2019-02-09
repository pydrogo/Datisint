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
    public class AgancyMetadata
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

        [DisplayName("شماره فکس به صورت 02111111111")]
        [StringLength(15, MinimumLength = 10, ErrorMessage = "شماره فکس نادرست")]
        public string Fax { get; set; }

        [DisplayName("شماره تلفن ثابت به صورت 02111111111")]
        [Required(ErrorMessage = "شماره تلفن ثابت را وارد کنید")]
        [StringLength(15, MinimumLength = 10, ErrorMessage = "شماره تلفن ثابت نادرست")]
        public string Tel { get; set; }

        [DisplayName("تاریخ ثبت به صورت 13950101")]
        [Required(ErrorMessage = "تاریخ ثبت را وارد کنید")]
        [StringLength(10, MinimumLength = 10, ErrorMessage = "تاریخ ثبت نادرست")]
        public string RegisterDate { get; set; }

        [DisplayName("محل ثبت")]
        [Required(ErrorMessage = "محل ثبت را وارد کنید")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "محل ثبت نادرست")]
        public string RegisterPlace { get; set; }


        [StringLength(4000)]
        public string JavazOrAsasnameh { get; set; }
        [DisplayName("تصویر اساسنامه یا جواز فروشگاه")]
        [Required(ErrorMessage = "فایل اساسنامه یا جواز فروشگاه انتخاب نشده است")]
        [DataType(DataType.Upload)]
        public HttpPostedFileBase JavazOrAsasnamehFile { get; set; }

        [DisplayName("تعداد پرسنل فنی")]
        [Required(ErrorMessage = "تعداد پرسنل فنی را وارد کنید")]
        [Range(0, 1000,ErrorMessage = "تعداد پرسنل فنی نادرست")]
        public string TedadPersonnelFanni { get; set; }

        [DisplayName("تعداد پرسنل اداری")]
        [Required(ErrorMessage = "تعداد پرسنل اداری را وارد کنید")]
        [Range(0, 1000, ErrorMessage = "تعداد پرسنل اداری نادرست")]
        public string TedadPersonnelEdari { get; set; }

        [DisplayName("تعداد پرسنل فروش")]
        [Required(ErrorMessage = "تعداد پرسنل فروش را وارد کنید")]
        [Range(0, 1000, ErrorMessage = "تعداد پرسنل فروش نادرست")]
        public string TedadPersonnelForush { get; set; }

        [DisplayName(" آیا تابحال پروژه مدار بسته انجام داده‌اید؟")]
        [StringLength(400, MinimumLength = 2, ErrorMessage = "انجام پروژه نادرست")]
        public string ProjeAnjamDadeid { get; set; }

        //[DisplayName(" پروژه‌های مهم انجام شده و نوع تجهیزات بکاررفته را نام ببرید؟")]
        //[StringLength(400, MinimumLength = 2, ErrorMessage = "پروژه های انجام شده نادرست")]


        [DisplayName(" آیا تا کنون نمایندگی برند خاصی را داشته اید؟ چه برندی؟")]
        [StringLength(400, MinimumLength = 2, ErrorMessage = "نمایندگی برند نادرست")]
        public string NamayandegBrandDashte { get; set; }

        [DisplayName(" توانایی شما در فروش تجهیزات مداربسته سالیانه تا چه حدی می‌باشد؟")]
        [StringLength(400, MinimumLength = 2, ErrorMessage = "توانایی فروش نادرست")]
        public string TavanayiSaliane { get; set; }

        [DisplayName(" آیا با محصولات مدار بسته پرادا آشنایی دارید؟ از چه طریق؟")]
        [StringLength(400, MinimumLength = 2, ErrorMessage = "آشنایی با پرادا نادرست")]
        public string AshnayiBaPrada { get; set; }


        [DisplayName("نوع محل کسب")]
        public Nullable<int> EjareShakhsi { get; set; }


        [DisplayName("سند ملکی")]
        public bool SanadMelki { get; set; }


        [DisplayName("سفته")]
        public bool Safte { get; set; }


        [DisplayName("چک ضمانت")]
        public bool CheckeZemanat { get; set; }


        [DisplayName("ضمانت نامه بانکی")]
        public bool ZemanatNamehBanki { get; set; }


        [DisplayName("وجه نقد")]
        public bool VajhNaghd { get; set; }


        [StringLength(4000)]
        public string PrintGardesh { get; set; }
        [DisplayName("پرینت 30 گردش آخر حساب بانکی")]
        [DataType(DataType.Upload)]
        public HttpPostedFileBase PrintGardeshFile { get; set; }


        public Nullable<System.DateTime> TarikheSabteDarkhast { get; set; }

        [Required(ErrorMessage = "مجموع را وارد کنید")]
        [StringLength(3, MinimumLength = 1)]
        [RegularExpression("([0-9]+)", ErrorMessage = "برای مجموع عدد وارد کنید")]
        public string Captcha { get; set; }
    }
}

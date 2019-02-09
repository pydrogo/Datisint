using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Datis.Data
{
    public class SimpleMembershipModel
    {
    }

    public class RegisterExternalLoginModel
    {
        [Required]
        [Display(Name = "نام کاربری")]
        public string UserName { get; set; }

        public string ExternalLoginData { get; set; }
    }

    public class LocalPasswordModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "رمز عبور فعلی")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "رمز عبور حداقل باید 6 کارکتر باشد", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "رمز عبور جدید")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "تکرار رمز عبور جدید")]
        [System.ComponentModel.DataAnnotations.Compare("NewPassword", ErrorMessage = "تکرار رمز عبور صحیح نیست")]
        public string ConfirmPassword { get; set; }
    }

    public class LoginModel
    {
        [Required]
        [Display(Name = "نام کاربری")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "رمز عبور")]
        public string Password { get; set; }

        [Display(Name = "مرا بخاطر بسپار")]
        public bool RememberMe { get; set; }
    }

    public class RegisterModel
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "نام کاربری")]
        public string UserName { get; set; }
        
        [Display(Name = "شماره مشتری")]
        public string CustomerNo { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "رمز عبور حداقل باید 6 کارکتر باشد", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "رمز عبور")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "تکرار رمز عبور")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "تکرار رمز عبور صحیح نیست")]
        public string ConfirmPassword { get; set; }

        public IList<SelectListItem> Roles { get; set; }
        public IList<string> SelectedRoles { get; set; }

        public RegisterModel()
        {
            Roles = new List<SelectListItem>();
            SelectedRoles = new List<string>();
        }
    }

    public class ExternalLogin
    {
        public string Provider { get; set; }
        public string ProviderDisplayName { get; set; }
        public string ProviderUserId { get; set; }
    }
}

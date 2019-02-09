using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Datis.Data
{
    class ClientsMessageMetadata
    {
        
        [ScaffoldColumn(false)]
        public int Id { get; set; }
        [Required(ErrorMessage = "نام را وارد کنید")]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }
        [Required(ErrorMessage = "موضوع پیام را وارد کنید")]
        [StringLength(50, MinimumLength = 3)]
        public string Subject { get; set; }
        [Required(ErrorMessage = "ایمیل را وارد کنید")]
        [StringLength(100, MinimumLength = 3)]
        [EmailAddress(ErrorMessage = "ایمیل نا معتبر")]
        public string Email { get; set; }
        [Required(ErrorMessage = "پیامی وارد نشده است یا طول پیام کوتاه است")]
        [StringLength(500, MinimumLength = 3)]
        public string Message { get; set; }
    }
}

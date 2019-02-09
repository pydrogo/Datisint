using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datis.Data
{
    public class OrderMetadata
    {
        [Required(ErrorMessage = "لطفا محصول را از لیست انتخاب کنید")]
        [DisplayName("محصول")]
        public int ProductId { get; set; }

        public int UserId { get; set; }

        [RegularExpression("([0-9]+)", ErrorMessage = "تعداد نامعتبر")]
        public int Tedad { get; set; }

        public System.DateTime OrderDate { get; set; }

    }
}

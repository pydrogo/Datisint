using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Datis.Models;
using Datis.Common;
using Datis.Data;
using System.Data.Entity.Validation;
namespace Datis.Controllers
{
    [Authorize(Roles = "RepairAdmin")]
    public class RepairAdminController : Controller
    {
        //
        // GET: /BrandAdmin/

        public ActionResult AjaxRead(RepairSearchVM searchOptions, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var all = pe.Repairs.Where(x => (x.Eshkal.Contains(searchOptions.Eshkal) || searchOptions.Eshkal == null) &&
                    (x.NameSherkat.Contains(searchOptions.NameSherkat) || searchOptions.NameSherkat == null)).Select(m => new RepairVM()
                {
                    Id = m.Id,
                    TamirOrMarjoo = m.TamirOrMarjoo == 0 ? "تعمیر" : "مرجوعی از فروش",
                    NameSherkat = m.NameSherkat,
                    NameMasool = m.NameMasool,
                    Ostan = pe.States.Where(b => b.Id == m.Ostan).FirstOrDefault().Name,
                    Shahrestan = pe.Cities.Where(b => b.Id == m.Shahrestan).FirstOrDefault().Name,
                    CodePosti = m.CodePosti,
                    Tel = m.Tel,
                    Mobile = m.Mobile,
                    Email = m.Email,
                    ModelDastgah = m.ModelDastgah,
                    ShomareSerialDastgah = m.ShomareSerialDastgah,
                    ShomareFactor = m.ShomareFactor,
                    FactorDate = m.FactorDate,
                    Address = m.Address,
                    Eshkal = m.Eshkal
                });
                var result = all.OrderBy(x => x.Id).ApplyPaging(parameters).ToList();

                return this.Store(result, all.Count());
            }
        }


        [HttpDelete]
        public ActionResult Delete(int Id)
        {
            using (DatisEntities de = new DatisEntities())
            {
                var record = de.Repairs.FirstOrDefault(m => m.Id == Id);
                de.Repairs.Remove(record);
                de.SaveChanges();
                var result = new
                {
                    success = true,
                    message = "حذف اطلاعات با موفقیت انجام شد"
                };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

    }
}

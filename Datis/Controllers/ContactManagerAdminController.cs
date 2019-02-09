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
    [Authorize(Roles = "ContactManagerAdmin")]
    public class ContactManagerAdminController : Controller
    {
        //
        // GET: /BrandAdmin/

        public ActionResult AjaxRead(ClientMessageVM searchOptions, StoreRequestParams parameters)
        {
            using (DatisEntities pe = new DatisEntities())
            {
                var all = pe.ClientsMessages.Where(x => (x.Name.Contains(searchOptions.Name) || searchOptions.Name == null)
                    && (x.Email.Contains(searchOptions.Email) || searchOptions.Email == null)
                    && (x.Subject.Contains(searchOptions.Subject) || searchOptions.Subject == null)
                    && (x.Message.Contains(searchOptions.Message) || searchOptions.Message == null)).Select(m => new ClientMessageVM()
                {
                    Id = m.Id,
                    Name = m.Name,
                    Subject=m.Subject,
                    Email = m.Email,
                    Message=m.Message
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
                var record = de.ClientsMessages.FirstOrDefault(m => m.Id == Id);
                de.ClientsMessages.Remove(record);
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

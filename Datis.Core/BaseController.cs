using Datis.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Datis.Core
{
    public abstract class BaseController : Controller
    {
        protected new JsonResult Json(object data)
        {
            return this.Json(data, "application/json", System.Text.Encoding.UTF8);
        }

        protected new JsonResult Json(object data, JsonRequestBehavior behavior)
        {
            return this.Json(data, "application/json", System.Text.Encoding.UTF8, behavior);
        }

        protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding)
        {
            return new JsonNetResult
            {
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                Data = data
            };
        }

        protected override JsonResult Json(object data, string contentType, System.Text.Encoding contentEncoding, JsonRequestBehavior behavior)
        {
            return new JsonNetResult
            {
                ContentType = contentType,
                ContentEncoding = contentEncoding,
                Data = data,
                JsonRequestBehavior = behavior
            };
        }
    }
}

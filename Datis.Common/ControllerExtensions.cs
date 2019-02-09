using Newtonsoft.Json;
using Datis.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Datis.Common
{
    public static class ControllerExtensions
    {
        public static JsonResult Store<T>(this Controller controller, Paging<T> data)
        {
            return new JsonNetResult
                {
                    Data = new
                        {
                            data = data.Data,
                            total = data.TotalRecords,
                            success = true,
                            message = ""
                        },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
        }

        public static JsonResult Store(this Controller controller, object data)
        {
            return new JsonNetResult
                {
                    Data = new
                        {
                            data
                        },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
        }

        public static JsonResult Store(this Controller controller, object data, int totalCount)
        {
            return new JsonNetResult
                {
                    Data = new
                        {
                            data,
                            total = totalCount,
                        },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
        }

        public static JsonResult Direct(this Controller controller, object result)
        {
            return new JsonResult
                {
                    Data = new
                        {
                            result
                        },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
        }

        public static JsonResult Message(this Controller controller, object message, bool success = true)
        {
            return new JsonResult
                {
                    Data = new
                        {
                            message,
                            success
                        },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datis.Common
{
    public class Paging<T>
    {
        private List<T> data;
        private int totalRecords;

        public List<T> Data
        {
            get
            {
                return this.data;
            }
            set
            {
                this.data = value;
            }
        }

        public int TotalRecords
        {
            get
            {
                return this.totalRecords;
            }
            set
            {
                this.totalRecords = value;
            }
        }

        public Paging()
        {
        }

        public Paging(IEnumerable<T> data, int totalRecords)
        {
            this.data = new List<T>(data);
            this.totalRecords = totalRecords;
        }

        public string Serialize()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject((object)this);
        }

        public virtual object SerializationObject()
        {
            return (object)new
            {
                data = this.Data,
                total = this.TotalRecords
            };
        }
    }
}

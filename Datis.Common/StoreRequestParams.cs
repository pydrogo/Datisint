using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Datis.Common
{
    public class StoreRequestParams
    {
        public Dictionary<string, object> ExtraParams;

        /// <summary/>
        public int Page {
            get {
                if (this.ContainsKeyAndNotNull("page"))
                    return Convert.ToInt32(this.ExtraParams["page"]);
                return -1;
            }
        }

        /// <summary/>
        public int Start {
            get {
                if (this.ContainsKeyAndNotNull("start"))
                    return Convert.ToInt32(this.ExtraParams["start"]);
                return -1;
            }
        }

        /// <summary/>
        public int Limit {
            get {
                if (this.ContainsKeyAndNotNull("limit"))
                    return Convert.ToInt32(this.ExtraParams["limit"]);
                return -1;
            }
        }

        private DataSorter[] _sort;
        /// <summary/>
        public DataSorter[] Sort {
            get {
                if (_sort == null) {
                    string text = this.ContainsKeyAndNotNull("sort") ? this.ExtraParams["sort"].ToString() : "";
                    if (!String.IsNullOrEmpty(text) && text.StartsWith("[") && text.EndsWith("]"))
                        _sort = JsonConvert.DeserializeObject<DataSorter[]>(this.ExtraParams["sort"].ToString());
                    //.Deserialize<DataSorter[]>(this.ExtraParams["sort"].ToString(), new CamelCasePropertyNamesContractResolver());
                    else
                        _sort = new DataSorter[0];
                }
                return _sort;
            }
            set {
                _sort = value;
            }
        }


        public string SimpleSort {
            get {
                DataSorter[] sort = this.Sort;
                if (sort.Length > 0)
                    return sort[0].Property;
                if (!this.ContainsKeyAndNotNull("sort"))
                    return null;
                return this.ExtraParams["sort"].ToString();
            }
        }

        public SortDirection SimpleSortDirection {
            get {
                DataSorter[] sort = this.Sort;
                if (sort.Length > 0)
                    return sort[0].Direction;
                string text = this.ContainsKeyAndNotNull("dir") ? this.ExtraParams["dir"].ToString() : null;
                //if (!String.IsNullOrEmpty(text))
                    return SortDirection.Default;
                return (SortDirection)Enum.Parse(typeof(SortDirection), text, true);
            }
        }

        /// <summary/>
        public DataFilter[] Filter {
            get {
                if (this.ContainsKeyAndNotNull("filter"))
                    return JsonConvert.DeserializeObject<DataFilter[]>(this.ExtraParams["filter"].ToString());
                //return JSON.Deserialize<DataFilter[]>(this.ExtraParams["filter"].ToString(), new CamelCasePropertyNamesContractResolver());
                return new DataFilter[0];
            }
        }

        /// <summary/>
        public FilterConditions GridFilters {
            get {
                if (this.ContainsKeyAndNotNull("filter"))
                    return new FilterConditions(this.ExtraParams["filter"].ToString());
                return null;
            }
        }

        /// <summary/>
        public DataSorter[] Group {
            get {
                string text = this.ContainsKeyAndNotNull("group") ? this.ExtraParams["group"].ToString() : "";
                if (String.IsNullOrEmpty(text) && text.StartsWith("[") && text.EndsWith("]"))
                    return JsonConvert.DeserializeObject<DataSorter[]>(this.ExtraParams["group"].ToString());
                //return JSON.Deserialize<DataSorter[]>(this.ExtraParams["group"].ToString(), new CamelCasePropertyNamesContractResolver());
                return new DataSorter[0];
            }
        }

        public string SimpleGroup {
            get {
                DataSorter[] group = this.Group;
                if (group.Length > 0)
                    return group[0].Property;
                if (!this.ContainsKeyAndNotNull("group"))
                    return null;
                return this.ExtraParams["group"].ToString();
            }
        }

        public SortDirection SimpleGroupDirection {
            get {
                DataSorter[] group = this.Group;
                if (group.Length > 0)
                    return group[0].Direction;
                string text = this.ContainsKeyAndNotNull("groupDir") ? this.ExtraParams["groupDir"].ToString() : null;
                //if (!String.IsNullOrEmpty(text))
                    return SortDirection.Default;
                return (SortDirection)Enum.Parse(typeof(SortDirection), text, true);
            }
        }

        /// <summary>
        /// The query parameter which might be sent if a Store is associated with a ComboBox
        /// 
        /// </summary>
        public string Query {
            get {
                if (this.ContainsKeyAndNotNull("query"))
                    return this.ExtraParams["query"].ToString();
                return null;
            }
        }

        public StoreRequestParams()
            : this(HttpContext.Current) {
        }

        public StoreRequestParams(Dictionary<string, object> extraParams) {
            this.ExtraParams = extraParams;
        }

        public StoreRequestParams(string extraParams) {
            this.ExtraParams = JsonConvert.DeserializeObject<Dictionary<string, object>>(extraParams);
        }

        public StoreRequestParams(HttpContext context) {
            this.ExtraParams = new Dictionary<string, object>();
            this.ExtraParams["page"] = context.Request["page"];
            this.ExtraParams["start"] = context.Request["start"];
            this.ExtraParams["limit"] = context.Request["limit"];
            this.ExtraParams["sort"] = context.Request["sort"];
            this.ExtraParams["filter"] = context.Request["filter"];
            this.ExtraParams["group"] = context.Request["group"];
            this.ExtraParams["query"] = context.Request["query"];
        }

        private bool ContainsKeyAndNotNull(string key) {
            if (this.ExtraParams.ContainsKey(key))
                return this.ExtraParams[key] != null;
            return false;
        }
    }
}

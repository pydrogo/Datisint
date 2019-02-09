using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datis.Common
{
    public class FilterConditions
    {
        private string filtersStr;
        private List<FilterCondition> conditions;

        public ReadOnlyCollection<FilterCondition> Conditions {
            get {
                if (this.conditions == null)
                    this.conditions = new List<FilterCondition>();
                return this.conditions.AsReadOnly();
            }
        }

        public FilterConditions(string filtersStr) {
            this.filtersStr = filtersStr;
            this.ParseConditions();
        }

        private void ParseConditions() {
            JArray jarray = JArray.Parse(this.filtersStr);
            this.conditions = new List<FilterCondition>();
            foreach (JObject jobject1 in (IEnumerable<JToken>)jarray) {
                JObject jobject2 = jobject1;
                FilterCondition filterCondition = new FilterCondition();
                filterCondition.Field = jobject2.Value<string>((object)"field");
                JToken jtoken = jobject2["data"];
                if (jtoken != null)
                    jobject2 = (JObject)jtoken;
                string text1 = jobject2.Value<string>((object)"type");
                if (!String.IsNullOrEmpty(text1))
                    filterCondition.Type = (FilterType)Enum.Parse(typeof(FilterType), text1, true);
                string text2 = jobject2.Value<string>((object)"comparison");
                if (!String.IsNullOrEmpty(text2))
                    filterCondition.Comparison = (Comparison)Enum.Parse(typeof(Comparison), text2, true);
                filterCondition.Property = jobject2.Property("value");
                this.conditions.Add(filterCondition);
            }
        }
    }
}

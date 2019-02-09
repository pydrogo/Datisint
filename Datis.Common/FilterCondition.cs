using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Datis.Common
{
    public class FilterCondition
    {
        private Comparison comparison;
        private JProperty property;

        public JProperty Property {
            get {
                return this.property;
            }
            internal set {
                this.property = value;
                this.ValueType = this.property.Value.Type;
            }
        }

        public string Field { get; internal set; }

        public FilterType Type { get; internal set; }

        public JTokenType ValueType { get; private set; }


        public Comparison Comparison {
            get {
                return this.comparison;
            }
            internal set {
                this.comparison = value;
            }
        }

        public List<string> List {
            get {
                if (this.Type != FilterType.List)
                    throw new Exception("Filter condition value is not a list");
                else
                    return new List<string>(this.Property.Value.Values<string>());
            }
        }

        public T Value<T>() {
            return this.Property.Value.Value<T>();
        }
    }
}

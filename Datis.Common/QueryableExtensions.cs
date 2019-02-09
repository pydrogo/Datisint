using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Dynamic;
using System.Threading.Tasks;
using System.Reflection;

namespace Datis.Common
{
    public static class QueryableExtensions
    {
        public static Paging<T> ToStoreResult<T>(this IEnumerable<T> data, StoreRequestParams parameters) {
            return ToStoreResult(data.AsQueryable(), parameters);
        }

        private static object GetValue<T>(FilterCondition condition) {
            switch (condition.Type) {
                case FilterType.Boolean:
                    return condition.Value<bool>();

                case FilterType.Date:
                    return condition.Value<DateTime>().Date;

                case FilterType.List:
                    return condition.List;

                case FilterType.Numeric:
                    if (typeof(T).GetProperty(condition.Field).PropertyType == typeof(int))
                        return condition.Value<int>();

                    return condition.Value<double>();

                case FilterType.String:
                    return condition.Value<string>();

                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        
        public static IQueryable<T> ApplyStoreFiltering<T>(this IQueryable<T> data, StoreRequestParams parameters) {
            return data.ApplyOrders(parameters).ApplyFilters(parameters).ApplyPaging(parameters);
        }

        public static IQueryable<T> ApplyOrders<T>(this IQueryable<T> data, StoreRequestParams parameters) {
            if (!string.IsNullOrEmpty(parameters.SimpleSort) && typeof(T).GetProperty(parameters.SimpleSort) != null)
                data = data.OrderBy(parameters.SimpleSort + " " + parameters.SimpleSortDirection);
            return data;
        }

        public static IQueryable<T> ApplyFilters<T>(this IQueryable<T> data, StoreRequestParams parameters) {
            if (parameters.GridFilters != null) {
                foreach (FilterCondition f in parameters.GridFilters.Conditions) {
                    var p = typeof(T).GetProperty(f.Field);
                    if (typeof(T).GetProperty(f.Field) == null)
                        continue;

                    String typeName = p.PropertyType.Name.ToLower();
                    if (typeName == "string")
                        data = data.Where(String.Format("{0}.Contains(@0)", f.Field), f.Value<String>());

                    if (typeName == "int32")
                        data = data.Where(String.Format("{0} = @0", f.Field), f.Value<Int32>());

                    if (typeName == "double")
                        data = data.Where(String.Format("{0} = @0", f.Field), f.Value<Double>());

                    if (typeName == "byte")
                        data = data.Where(String.Format("{0} = @0", f.Field), f.Value<Byte>());

                    if (typeName == "datetime") {
                        switch (f.Comparison) {
                            case Comparison.Lt:
                                data = data.Where(f.Field + " <= @0", f.Value<DateTime>());
                                break;
                            case Comparison.Gt:
                                data = data.Where(f.Field + " >= @0", f.Value<DateTime>());
                                break;
                            case Comparison.Eq:
                                data = data.Where(f.Field + " = @0", f.Value<DateTime>());
                                break;
                            default:
                                data = data.Where(f.Field + " = @0", f.Value<DateTime>());
                                break;
                        }
                    }
                }
            }

            return data;
        }

        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> data, StoreRequestParams parameters) {
            if (parameters.Start >= 0 && parameters.Limit > 0)
                return data.Skip(parameters.Start).Take(parameters.Limit);
            return data;
        }
    }

    public static class ListExtensions
    {
        public static List<T> ApplyStoreFiltering<T>(this List<T> list, StoreRequestParams parameters) {
            return list.ApplyOrders(parameters).ApplyFilters(parameters).ApplyPaging(parameters);
        }

        public static List<T> ApplyOrders<T>(this List<T> list, StoreRequestParams parameters) {
            //if (!string.IsNullOrEmpty(parameters.SimpleSort))
            //    list = list.OrderBy(parameters.SimpleSort + " " + parameters.SimpleSortDirection);

            return list;
        }

        public static List<T> ApplyFilters<T>(this List<T> list, StoreRequestParams parameters) {
            if (parameters.GridFilters != null) {
                foreach (FilterCondition f in parameters.GridFilters.Conditions) {
                    PropertyInfo p = typeof(T).GetProperty(f.Field);
                    if (typeof(T).GetProperty(f.Field) == null)
                        continue;

                    String typeName = p.PropertyType.Name.ToLower();
                    if (typeName == "string") {
                        Func<T, bool> where =
                            s => ((string)s.GetType().GetProperty(f.Field).GetValue(s, null)).Contains(f.Value<String>());

                        list = list.Where(where).ToList();
                    }
                    if (typeName == "int32") {
                        Func<T, bool> where =
                            s => (int)s.GetType().GetProperty(f.Field).GetValue(s, null) == f.Value<Int32>();

                        list = list.Where(where).ToList();
                    }
                    if (typeName == "double") {
                        Func<T, bool> where =
                            s => (double)s.GetType().GetProperty(f.Field).GetValue(s, null) == f.Value<Double>();

                        list = list.Where(where).ToList();
                    }
                    if (typeName == "byte") {
                        Func<T, bool> where =
                            s => (byte)s.GetType().GetProperty(f.Field).GetValue(s, null) == f.Value<Byte>();

                        list = list.Where(where).ToList();
                    }
                    if (typeName == "datetime") {
                        Func<T, bool> where;
                        switch (f.Comparison) {
                            case Comparison.Lt:
                                where =
                                    s => (DateTime)s.GetType().GetProperty(f.Field).GetValue(s, null) <= f.Value<DateTime>();
                                break;
                            case Comparison.Gt:
                                where =
                                    s => (DateTime)s.GetType().GetProperty(f.Field).GetValue(s, null) >= f.Value<DateTime>();
                                break;
                            default:
                                where =
                                    s => (DateTime)s.GetType().GetProperty(f.Field).GetValue(s, null) == f.Value<DateTime>();
                                break;
                        }
                        list = list.Where(where).ToList();

                    }
                    if (typeName == "ienumerable`1") {
                        Func<T, bool> where =
                            s => ((IEnumerable<int>)s.GetType().GetProperty(f.Field).GetValue(s, null)).Contains(f.Value<Int32>());

                        list = list.Where(where).ToList();
                    }
                }
            }

            return list;
        }

        public static List<T> ApplyPaging<T>(this List<T> list, StoreRequestParams parameters) {
            return list.GetRange(parameters.Start < list.Count() ? parameters.Start : 0, parameters.Limit < list.Count() ? parameters.Limit : list.Count());
        }
    }
}

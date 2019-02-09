using System.Web;
using System.Web.Optimization;

namespace Datis
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/extjs")
                .Include("~/Content/extjs/ext-all-rtl-debug.js")
                .Include("~/Content/extjs/local/ext-lang-fa.js")
                .Include("~/Content/extjs/pdate.js")
                .Include("~/Content/extjs/ux/ProgressBarPager.js")
                .Include("~/Content/hussein/hussein-all.js")
                );

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
            bundles.Add(new ScriptBundle("~/bundles/view/index").IncludeDirectory("~/Content/js/view", "*.js"));

            bundles.Add(new ScriptBundle("~/bundles/util").IncludeDirectory("~/Content/js/util", "*.js"));
            bundles.Add(new StyleBundle("~/Content/plupload").Include(
    "~/Content/css/plupload/jquery.ui.plupload.css"));
            bundles.Add(new ScriptBundle("~/Content/js/sitejs")
    .Include("~/content/js/jquery.min.js")
    .Include("~/content/js/modernizr-2.6.2.min.js")
    .Include("~/content/js/megaMenu.js")
    .Include("~/content/js/slider.js")
    );

            bundles.Add(new StyleBundle("~/Content/css/sitecss")
                .Include("~/content/css/normalize.css")
                .Include("~/content/css/style.css")
                .Include("~/content/css/megaMenu.css")
                .Include("~/content/css/slider.css")
                );
        }
    }
}
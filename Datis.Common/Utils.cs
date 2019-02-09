using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Datis.Common
{
    public static class Utils
    {
        private const int IssueZeroCount = 9;
        public static byte Priority(byte impact, byte urgency)
        {
            if (impact == 0 || urgency == 0)
                return 0;

            return (byte)(impact + urgency - 1);
        }

        public struct ArvandFileproperties
        {
            public string FileName;
            public string Path;
            public string Message;
            public Boolean Success;

        };

        private static readonly List<string> SupportedExtensionDefault = new List<string>() { "Zip", "rar", "doc", "docx", "txt", "jpg", "png" };
        public static ArvandFileproperties ArvandFileUpload(HttpPostedFileBase postedFile, string path, int lenght = 2048, List<string> supportedExtension = null)
        {
            string NewFileName, FilePath;
            ArvandFileproperties Fileproperties;
            try
            {
                supportedExtension = supportedExtension == null ? SupportedExtensionDefault : supportedExtension;
                var fileExt = System.IO.Path.GetExtension(postedFile.FileName).Substring(1);
                if (!supportedExtension.Contains(fileExt))
                {
                    throw new HttpException(500, "file not supported");
                }
                if (postedFile != null)
                {
                    string postedFileName = Path.GetFileName(postedFile.FileName);
                    int idx = postedFileName.LastIndexOf('.');
                    string extention = postedFileName.Substring(idx > 0 ? idx + 1 : 0);
                    NewFileName = String.Format("{0}.{1}", DateTime.Now.ToFileTime().ToString(), extention);
                    path = path + NewFileName;
                    FilePath = HttpContext.Current.Server.MapPath("~" + path);
                    postedFile.SaveAs(FilePath);
                }
                Fileproperties.FileName = postedFile.FileName;
                Fileproperties.Path = path;
                Fileproperties.Success = true;
                Fileproperties.Message = "File Uploaded";
            }
            catch (Exception)
            {
                //ArvandFileproperties FilepropertiesE
                Fileproperties.FileName = postedFile.FileName;
                Fileproperties.Path = path;
                Fileproperties.Success = false;
                Fileproperties.Message = "don't file Uploaded";
                return Fileproperties;
            }
            return Fileproperties;
        }

        public static string IssueNumber(byte issueType, int issueId)
        {
            string strIssueId = issueId.ToString();
            int idLenght = strIssueId.Length;
            int zeroCount = IssueZeroCount - idLenght;
            string returnValue = "";
            for (int i = 0; i < zeroCount; i++)
            {
                returnValue += "0";
            }
            returnValue += issueId;
            switch (issueType)
            {
                case 1:
                    returnValue = "INC" + returnValue;
                    break;
                case 2:
                    returnValue = "PLM" + returnValue;
                    break;
                case 3:
                    returnValue = "CR" + returnValue;
                    break;
                case 4:
                    returnValue = "TSK" + returnValue;
                    break;
            }
            return returnValue;
        }

        public static string AuditParentText(DateTime date, string user)
        {
            //return HusseinConvert.ToPersianDateTimeString(date) + " توسط " + user;
            return "";
        }

        public static string AuditChildText(string changedField, string oldValue, string newValue)
        {
            string result = "";
            if (string.IsNullOrEmpty(oldValue))
            {
                result = changedField + @" set to """ + newValue + @""". ";
            }
            else
            {
                result = changedField + @" changed from """ + oldValue + @""" to """ + newValue + @""". ";
            }
            return result;
        }

        public static string UserMachineName
        {
            get { return HttpContext.Current.Request.LogonUserIdentity != null ? HttpContext.Current.Request.LogonUserIdentity.Name : null; }
        }

        public static string GetModelStateErrorList(ModelStateDictionary modelState)
        {
            var errorList = (from item in modelState.Values
                             from error in item.Errors
                             select error.ErrorMessage).ToList();

            //foreach (var modelStateVal in modelState.Values)
            //{
            //    foreach (var error in modelStateVal.Errors)
            //    {
            //        var errorMessage = error.ErrorMessage;
            //        var exception = error.Exception;
            //        // You may log the errors if you want
            //    }
            //}

            var keys = from item in modelState
                       where item.Value.Errors.Any()
                       select item.Key;

            string msg = "";
            foreach (var item in errorList)
                msg += item + "<br/>";

            return msg;
        }

        public static string GetModelStateErrorListKeys(ModelStateDictionary modelState)
        {
            var keys = from item in modelState
                       where item.Value.Errors.Any()
                       select item.Key;

            string msg = "";
            foreach (var item in keys)
                msg += item + "<br/>";

            return msg;
        }
        public static Bitmap ResizeImage(Image image, int width, int height)
        {
            var destRect = new Rectangle(0, 0, width, height);
            var destImage = new Bitmap(width, height);

            destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(destImage))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }

            return destImage;
        }


        public static string SucceedMessage
        {
            get { return "ذخیره اطلاعات با موفقیت انجام شد."; }
        }

        public static string HolidaysErrorMessage
        {
            get { return "تاریخ انجام عملیات از روزهای غیر کاری است. لطفا آنرا تصحیح نمائید."; }
        }

        public static string RecordErrorMessage
        {
            get { return "عملیات مورد نظر شما غیر قابل انجام نیست."; }
        }

        public static string SaveErrorMessage {
            get { return "عملیات مورد نظر شما به به دلیل رخ دادن خطایی متوقف شد."; }
        }

        public static string AccessErrorMessage
        {
            get { return "تاریخ انجام عملیات از روزهای غیر کاری است. لطفا آنرا تصحیح نمائید."; }
        }
    }

}

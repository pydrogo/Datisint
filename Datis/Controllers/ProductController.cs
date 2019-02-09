using Datis.Data;
using Datis.Models;
using Datis.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Datis.Controllers
{
    [RoutePrefix("Product")]
    public class ProductController : Controller
    {
        //
        // GET: /Product/
        public ActionResult Index()
        {
            return View();
        }
        [Route("{Id}/{ProductTitle}")]
        public ActionResult Detail(int Id)
        {
            using (var de = new DatisEntities())
            {
                Product currentProduct = de.Products.Where(m => m.Id == Id).FirstOrDefault();
                if (currentProduct != null)
                {
                    BrandCategory brandCat = currentProduct.BrandCategory;

                    List<string> images = de.Images.Where(m => m.ProductId == currentProduct.Id && m.TableId == (int)DatisEnums.TableId.Product).Select(p => p.Path).ToList();
                    Image mainImage = de.Images.Where(m => m.ProductId == currentProduct.Id && m.Type == (int)DatisEnums.ImgeType.Main && m.TableId == (int)DatisEnums.TableId.Product).FirstOrDefault();
                    List<ProductImageVM> allImagesList = new List<ProductImageVM>();
                    if (images.Count > 0)
                    {

                        foreach (var image in images)
                        {
                            ProductImageVM pi = new ProductImageVM
                            {
                                Image200 = image.AddDirectoryToPath("200"),
                                Image350 = image.AddDirectoryToPath("350"),
                                Image60 = image.AddDirectoryToPath("60"),
                                ImageOrg = image
                            };
                            allImagesList.Add(pi);
                        }
                    }
                    Image bLogo = de.Images.Where(m => m.BrandId == currentProduct.BrandCategory.BrandId && m.TableId == (int)DatisEnums.TableId.Brand).FirstOrDefault();
                    List<Tuple<string, string>> featuresKeyVal = new List<Tuple<string, string>>();
                    List<KeyValuePair<string, string>> filesKeyVal = new List<KeyValuePair<string, string>>();
                    featuresKeyVal = de.FeatureProducts.Where(n => n.ProductId == currentProduct.Id).Select(j => new { j.Feature.Name, j.Value }).AsEnumerable().Select(p => Tuple.Create(p.Name, p.Value)).ToList();
                    filesKeyVal =
                        de.Files.Where(
                                m => m.TableId == (int)DatisEnums.TableId.Product && m.ForeignId == currentProduct.Id)
                            .Select(x => new { Name = x.Name, Val = x.Path })
                            .ToDictionary(t => t.Name, t => t.Val)
                            .ToList();
                    ProductVM pvm = new ProductVM()
                    {
                        Model = currentProduct.Model,
                        Id = currentProduct.Id,
                        Description = currentProduct.Description,
                        MainImage200 = mainImage != null ? mainImage.Path.AddDirectoryToPath("200") : "",
                        MainImage350 = mainImage != null ? mainImage.Path.AddDirectoryToPath("350") : "",
                        MainImage60 = mainImage != null ? mainImage.Path.AddDirectoryToPath("60") : "",
                        MainImage = mainImage != null ? mainImage.Path : "",
                        BrandName = currentProduct.BrandCategory.Brand.Name,
                        BrandLogo = bLogo != null ? bLogo.Path.AddDirectoryToPath("60") : "",
                        AllImages = allImagesList,
                        CategoryName = currentProduct.BrandCategory.Category.Name,
                        Features = featuresKeyVal,
                        Summary = currentProduct.Summary,
                        FeaturesSummary = currentProduct.FeaturesSummary,
                        Files = filesKeyVal

                    };
                    List<KeyValuePair<string, string>> breadItems = new List<KeyValuePair<string, string>>();
                    KeyValuePair<string, string> brand = new KeyValuePair<string, string>(currentProduct.BrandCategory.Brand.Name, Url.Action("Index", "Brand", new { Id = currentProduct.BrandCategory.BrandId, BrandTitle = currentProduct.BrandCategory.Brand.Name }));
                    breadItems.Add(brand);
                    KeyValuePair<string, string> rootCat = new KeyValuePair<string, string>(currentProduct.BrandCategory.Category.Name, Url.Action("Index", "Category", new { Id = currentProduct.BrandCategory.CategoryId, CategoryTitle = currentProduct.BrandCategory.Category.Name }));
                    breadItems.Add(rootCat);
                    ViewBag.BreadCrumb = breadItems;

                    #region Related Products
                    BrandCategory currentBrandCat = de.BrandCategories.FirstOrDefault(m => m.Id == currentProduct.BrandCategory.Id);
                    List<ProductVM> productsVm = new List<ProductVM>();
                    if (currentBrandCat != null)
                    {
                        foreach (var product in currentBrandCat.Products.Take(10))
                        {
                            Image mLogo =
                                de.Images.FirstOrDefault(m => m.ProductId == product.Id && m.Type == (int)DatisEnums.ImgeType.Main &&
                                        m.TableId == (int)DatisEnums.TableId.Product);
                            Image bLogo2 =
                                de.Images.FirstOrDefault(m => m.BrandId == product.BrandCategory.BrandId &&
                                        m.TableId == (int)DatisEnums.TableId.Brand);
                            ProductVM pvm2 = new ProductVM()
                            {
                                Model = product.Model,
                                Id = product.Id,
                                Description = product.Description,
                                MainImage = mLogo != null ? mLogo.Path : "",
                                MainImage200 = mLogo != null ? mLogo.Path.AddDirectoryToPath("200") : "",
                                MainImage350 = mLogo != null ? mLogo.Path.AddDirectoryToPath("350") : "",
                                MainImage60 = mLogo != null ? mLogo.Path.AddDirectoryToPath("60") : "",
                                BrandName = product.BrandCategory.Brand.Name,
                                BrandLogo = bLogo2 != null ? bLogo2.Path.AddDirectoryToPath("60") : ""
                            };
                            productsVm.Add(pvm2);
                        }
                        ViewBag.Related = productsVm;
                    }

                    #endregion

                    return View(pvm);
                }
                return null;
            }

        }

        public ActionResult Search(string term)
        {
            using (var de = new DatisEntities())
            {
                UrlHelper u = new UrlHelper(this.ControllerContext.RequestContext);
                List<ProductVM> productsVM = new List<ProductVM>();
                foreach (var product in de.Products.Where(m => m.Model.Contains(term)).Take(6))
                {
                    Image mLogo = de.Images.Where(m => m.ProductId == product.Id && m.Type == (int)DatisEnums.ImgeType.Main && m.TableId == (int)DatisEnums.TableId.Product).FirstOrDefault();
                    Image bLogo = de.Images.Where(m => m.BrandId == product.BrandCategory.BrandId && m.TableId == (int)DatisEnums.TableId.Brand).FirstOrDefault();
                    ProductVM pvm = new ProductVM()
                    {
                        Model = product.Model,
                        Id = product.Id,
                        Description = product.Description,
                        MainImage = mLogo != null ? mLogo.Path : "",
                        MainImage200 = mLogo != null ? mLogo.Path.AddDirectoryToPath("200") : "",
                        MainImage350 = mLogo != null ? mLogo.Path.AddDirectoryToPath("350") : "",
                        MainImage60 = mLogo != null ? mLogo.Path.AddDirectoryToPath("60") : "",
                        BrandName = product.BrandCategory.Brand.Name,
                        BrandLogo = bLogo != null ? bLogo.Path.AddDirectoryToPath("60") : "",
                        Link = u.Action("Detail", "Product", new { Id = product.Id, ProductTitle = product.Model })
                    };
                    productsVM.Add(pvm);
                }
                return Json(productsVM, JsonRequestBehavior.AllowGet);
            }
        }
    }
}
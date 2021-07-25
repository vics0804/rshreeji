using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RShreeji.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace RShreeji.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public HomeController(ILogger<HomeController> logger, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index()
        {
            clsProductsViewModel objHomeVM = new clsProductsViewModel();

            #region MASALA BENEFITS
            {
                var jsonString = System.IO.File.ReadAllText(System.IO.Path.Combine(_webHostEnvironment.WebRootPath, "json", "masala-benefits.json"));
                List<clsProductsViewModel.clsProducts> lstProducts = JsonSerializer.Deserialize<List<clsProductsViewModel.clsProducts>>(jsonString);

                if (lstProducts?.Count > 0)
                {
                    lstProducts = lstProducts.OrderBy(a => a.sortorder ?? 999).ToList();
                }
                objHomeVM.MasalaBenefits = lstProducts;
                ViewBag.MasalaBenefitsJson = jsonString;
            }
            #endregion MASALA BENEFITS

            #region PRODUCTS
            {
                var jsonString = System.IO.File.ReadAllText(System.IO.Path.Combine(_webHostEnvironment.WebRootPath, "json", "home-products.json"));
                List<clsProductsViewModel.clsProducts> lstProducts = JsonSerializer.Deserialize<List<clsProductsViewModel.clsProducts>>(jsonString);

                if (lstProducts?.Count > 0)
                {
                    lstProducts = lstProducts.OrderBy(a => a.sortorder ?? 999).ToList();
                }
                objHomeVM.Products = lstProducts;
                ViewBag.HomeProductsJson = jsonString;
            }
            #endregion PRODUCTS

            return View(objHomeVM);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

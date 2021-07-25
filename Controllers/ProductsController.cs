using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using RShreeji.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace RShreeji.Controllers
{
    public class ProductsController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductsController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index()
        {
            var jsonString = System.IO.File.ReadAllText(System.IO.Path.Combine(_webHostEnvironment.WebRootPath, "json", "products.json"));
            List<clsProductsViewModel.clsProducts> lstProducts = JsonSerializer.Deserialize<List<clsProductsViewModel.clsProducts>>(jsonString);

            if (lstProducts?.Count > 0)
            {
                lstProducts = lstProducts.OrderBy(a => a.sortorder ?? 999).ToList();
            }

            ViewBag.ProductsJson = jsonString;

            return View(lstProducts);
        }
    }
}

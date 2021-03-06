using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;
using RShreeji.ViewModels;
using Microsoft.AspNetCore.Hosting;

namespace RShreeji.Controllers
{
    public class GalleryController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public GalleryController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Index()
        {
            var jsonString = System.IO.File.ReadAllText(System.IO.Path.Combine(_webHostEnvironment.WebRootPath, "json", "gallery.json"));
            List<clsProductsViewModel.clsProducts> lstProducts = JsonSerializer.Deserialize<List<clsProductsViewModel.clsProducts>>(jsonString);

            if (lstProducts?.Count > 0)
            {
                lstProducts = lstProducts.OrderBy(a => a.sortorder ?? 999).ToList();
            }

            ViewBag.GalleryJson = jsonString;

            return View(lstProducts);
        }
    }
}

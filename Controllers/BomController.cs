using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StudentHtml.Models;

namespace StudentHtml.Controllers
{
    public class BomController : Controller
    {
        private readonly ILogger<BomController> _logger;

        public BomController(ILogger<BomController> logger)
        {
            _logger = logger;
        }

    public IActionResult GetTypeDataByEQId(string critiria)
        {

            List<Bom_Index> item = new List<Bom_Index>();

            for (int i = 0; i < 5; i++) {
                Random rnd = new Random();
                item.Add(new Bom_Index() {ID = "15647" + i, NameProduct = "สิ้นค้า A00" + i});
            }

            return Json(item);
        }


        public IActionResult Index(string Seacrh)
        {

            List<Bom_Header> item = new List<Bom_Header>();

            for (int i = 0; i < 5; i++) {
                Random rnd = new Random();
                item.Add(new Bom_Header() {A = "#", ID = "1100" + i, NameProduct = "สิ้นค้า A00" + i, Amount = rnd.Next(1, 13), Type = "ภายนอก", Company = "Company" + i });
            }

            return View(item);
        }

        public IActionResult Edit(string amoung,string note)
        {
            try
            {
               
                return Json(new { success = true});
            }
            catch (Exception ex)
            {
                return Json(new { success = false, ex = ex.Message + ex.InnerException.Message.ToString()    });
            } 

        }

        public IActionResult Save(string name,string Type, string Amount, string note)
        {
            try
            {
               
                return Json(new { success = true});
            }
            catch (Exception ex)
            {
                return Json(new { success = false, ex = ex.Message + ex.InnerException.Message.ToString()    });
            } 

        }
        public IActionResult SaveProductBom(string name, string ShopOrder, int Amount, string Type, string Company)
        {
            try
            {
               
                return Json(new { success = true});
            }
            catch (Exception ex)
            {
                return Json(new { success = false, ex = ex.Message + ex.InnerException.Message.ToString()    });
            } 

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

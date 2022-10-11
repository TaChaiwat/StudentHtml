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
    public class WorkingtimeController : Controller
    {
        private readonly ILogger<WorkingtimeController> _logger;

        public WorkingtimeController(ILogger<WorkingtimeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(String Seacrh)
        {

            return View();
        }

        public IActionResult Edit(String ShopOrder, String Product, String Unit, String Belt, String Stime, String Etime)
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

        public IActionResult Savetwo(String Stimes, String Etimes)
        {
            return View();
        }

        public IActionResult Search1(string Search)
        {
        List<Working_Header> item = new List<Working_Header>();
            for (int i = 0; i < 5; i++)
            { Random rnd = new Random(); 

                  
                item.Add(new Working_Header() { ID = "C1100" + i, NameProduct = "CHICKEN BONELESS THIGH FROZEN A001"+ i , Agency ="5330 : คิริมิ" , Belt ="R1" ,  Stime ="09.30" ,Etime ="15.00"});
            }
           
            return Json(item);
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

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
    public class ExampleController : Controller
    {
        private readonly ILogger<ExampleController> _logger;

        public ExampleController(ILogger<ExampleController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(String Seacrh)
        {
            List<Bom_Header> item = new List<Bom_Header>();
            for (int i = 0; i < 25; i++)
            { Random rnd = new Random(); 

                  
                 item.Add(new Bom_Header() { ID = "1100" + i, NameProduct = "สิ้นค้า A00"+ i ,  Amount =  rnd.Next(1, 13) , Type ="ภายนอก" , Company ="Company" + i });
            }

            return View(item);
        }

        public IActionResult Edit(string id,string name)
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
        
       public IActionResult Delete(string id)
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

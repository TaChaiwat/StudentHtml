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

        public IActionResult Index()
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

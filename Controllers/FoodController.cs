using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using my_new_app.Models;

namespace my_new_app.Controllers
{
    public class FoodContoller : Controller
    {
        private readonly AppDBContext _db;
        public FoodContoller(AppDBContext db)
        {
            _db = db;
        }

        [HttpGet]
        //รับข้อมูลเกี่ยวกับการฝากซื้อ
        public IActionResult Fark(string Header, string Description)
        {
            //รับข้อมูล header เป็นหัวข้อ, Description เป็นคำบรรยายของที่จะฝาก , Status เป็น status ของของที่จะฝาก โดยในที่นี้จะเป็น 0 คือกำลังรอคนมารับ

            //รับข้อมูลผู้ใช้จาก cookie
            var owner = Request.Cookies["email"];
            if (owner == null)
            {
                return BadRequest("No cookie (User didn't login)");
            }
            //สร้าง ข้อมูลใหม่ของ user ที่จะถูกเพิ่มไป database
            FoodModel newFark = new FoodModel(owner, Header, Description, 0);
            _db.Food.Add(newFark);
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet]
        //ผู้ใช้เรียกข้อมูลเกี่ยวกับของที่ตนเองฝากซื้อ
        public IActionResult Getmyorder()
        {
            //ดูรายการที่ตนเองโพสต์ฝากไป
            //List<FoodModel> UserFoos = new List<FoodModel>();
            var user = Request.Cookies["email"];
            //ถ้าหากไม่มี user 
            if (user == null)
            {
                return BadRequest("Error, No User Cookie");
            }
            //สร้าง list ที่จะเป็นข้อมูลของ user ที่จะส่งไปยัง frontend
            var myOrder = _db.Food.Where(u => u.Owner == user && (u.Status == 1 || u.Status == 0)).ToList();
            //return json ของlist 
            return Ok(JsonSerializer.Serialize(myOrder));
        }

        [HttpPost]
        //ผู้ใช้เรียกข้อมูลของทุกคนที่โพสต์หาคนที่ฝากที่ไม่ใช่ของตนเอง
        public IActionResult Geteveryorder()
        {
            var user = Request.Cookies["email"];
            if (user == null)
            {
                return BadRequest("Error, No User Cookie");
            }
            //สร้าง list ของข้อมูลของคนที่ฝากซื้อแล้วยังไม่มีคนรับไป
            var order = _db.Food.Where(u => u.Owner != user && u.Status == 0).ToList();

            return Ok(JsonSerializer.Serialize(order));
        }

        [HttpPost]
        //ผู้ใช้กดรับฝากซื้อ 
        public IActionResult Acceptorder(int OrderID)
        {
            var user = Request.Cookies["email"];
            if (user == null)
            {
                return BadRequest("Error, No User Cookie");
            }
            var picked_order = _db.Food.FirstOrDefault(u => u.Id == OrderID);
            if (picked_order == null)
            {
                return BadRequest("Error, No Order from the id, Order could be taken");
            }
            picked_order.Status = 1;
            _db.SaveChanges();
            return Ok();
        }



    }
}
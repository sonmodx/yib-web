using Microsoft.AspNetCore.Mvc;
using my_new_app.Models;

namespace my_new_app.Controllers
{
    public class FoodController : Controller
    {
        private readonly AppDBContext _db;
        public FoodController(AppDBContext db)
        {
            _db = db;
        }

        [HttpPost]
        //รับข้อมูลเกี่ยวกับการฝากซื้อ
        public IActionResult Fark([FromBody] FarkModel model)
        {
            //รับข้อมูล header เป็นหัวข้อ, Description เป็นคำบรรยายของที่จะฝาก , Status เป็น status ของของที่จะฝาก โดยในที่นี้จะเป็น 0 คือกำลังรอคนมารับ

            //รับข้อมูลผู้ใช้จาก cookie
            var owner = Request.Cookies["email"];
            if (owner == null)
            {
                return Unauthorized("No cookie (User didn't login)");
            }
            //สร้าง ข้อมูลใหม่ของ user ที่จะถูกเพิ่มไป database
            Console.WriteLine("{0} {1}", model.Header, model.Description);
            FoodModel newFark = new FoodModel(owner, model.Header!, model.Description!, 0);
            _db.Food.Add(newFark);
            _db.SaveChanges();
            return Ok();
        }
        [HttpPost]
        //ผู้ใช้ยกเลิกการฝากซื้อ
        public IActionResult CancleFark([FromQuery] int OrderID)
        {
            var owner = Request.Cookies["email"];
            if (owner == null)
            {
                return Unauthorized("No cookie (User didn't login)");
            }
            //ต้องยังไม่มีคนกดรับ
            var myorder = _db.Food.FirstOrDefault(u => u.Id == OrderID && u.RiderEmail == null);
            if (myorder == null)
            {
                return BadRequest("Order has been yib or No order in DB");
            }
            _db.Food.Remove(myorder);
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

            return Ok(_db.Food.Where(u => u.Email == user && (u.Status == 1 || u.Status == 0)));
        }

        [HttpGet]
        //ผู้ใช้เรียกข้อมูลของทุกคนที่โพสต์หาคนที่ฝากที่ไม่ใช่ของตนเอง
        public IActionResult Geteveryorder()
        {
            var user = Request.Cookies["email"];
            if (user == null)
            {
                return BadRequest("Error, No User Cookie");
            }
            //สร้าง list ของข้อมูลของคนที่ฝากซื้อแล้วยังไม่มีคนรับไป
            return Ok(_db.Food.Where(u => (u.Email != user && u.Status == 0) || (u.RiderEmail == user && u.Status != 2)));
        }

        [HttpPost]
        //ผู้ใช้กดรับฝากซื้อหรือยกเลิกการับรฝากซื้อ
        public IActionResult Updateorder([FromQuery] int OrderID, [FromQuery] int Status)
        {
            var user = Request.Cookies["email"];
            Console.WriteLine("{0}", OrderID.GetType());
            if (user == null)
            {
                return Unauthorized("Error, No User Cookie");
            }
            Console.WriteLine("orderID: {0}", OrderID);
            //หาข้อมูลจาก OrderID โดยที่จะต้องยังไม่มีผู้รับ order ไป
            var picked_order = _db.Food.FirstOrDefault(u => u.Id == OrderID && u.RiderEmail == null);
            Console.WriteLine("{0}", picked_order);
            if (picked_order == null)
            {
                return BadRequest("Error, No Order from the id, Order could be taken");
            }

            if (Status == 1)
            {
                picked_order.RiderEmail = user;
            }
            else if (Status == 0)
            {
                picked_order.RiderEmail = null;
            }
            else
            {
                return BadRequest("Error, Status code from frontend");
            }
            picked_order.Status = Status;
            _db.SaveChanges();
            return Ok();
        }



    }
}
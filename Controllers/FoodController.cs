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
            var owner = CheckUser(Request.Cookies["UserID"]);
            var username = _db.Users.SingleOrDefault(u => u.email == owner);
            if (owner == null || username == null)
            {
                return Unauthorized("Cookie or User Error");
            }
            //สร้าง ข้อมูลใหม่ของ user ที่จะถูกเพิ่มไป database
            FoodModel newFark = new FoodModel(username.username, owner, model.Header!, model.Description!, 0);
            _db.Food.Add(newFark);
            _db.SaveChanges();
            return Ok();
        }

        [HttpPost]
        //ผู้ใช้ยกเลิกการฝากซื้อ
        public IActionResult CancelFark([FromQuery] int OrderID)
        {
            var owner = CheckUser(Request.Cookies["UserID"]);
            if (owner == null)
            {
                return Unauthorized("Cookie Error");
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
        [HttpPost]
        //ผู้ใช้กดรับอาหาร,อาหารมาถึงแล้ว
        public IActionResult AcceptFark([FromQuery] int OrderID)
        {
            var owner = CheckUser(Request.Cookies["UserID"]);
            if (owner == null)
            {
                return Unauthorized("Cookie Error");
            }
            var myorder = _db.Food.FirstOrDefault(u => u.Id == OrderID && u.RiderEmail != null);
            if (myorder == null)
            {
                return NotFound("Error, Order Not Found");
            }
            myorder.Status = 2;
            _db.SaveChanges();
            return Ok();
        }

        [HttpGet]
        //ผู้ใช้เรียกข้อมูลเกี่ยวกับของที่ตนเองฝากซื้อ
        public IActionResult Getmyorder()
        {
            //ดูรายการที่ตนเองโพสต์ฝากไป
            var user = CheckUser(Request.Cookies["UserID"]);
            if (user == null)
            {
                return Unauthorized("Cookie Error");
            }
            var CompleteOrder = _db.Food.Where(u => u.Email == user && u.Status == 2);
            var PendingOrder = _db.Food.Where(u => u.Email == user && u.Status != 2);
            return Ok(PendingOrder.Concat(CompleteOrder).Select(f => new { f.Id, f.Username, f.Header, f.Description, f.Status, f.RaiderUsername }));
        }

        [HttpGet]
        //ผู้ใช้เรียกข้อมูลของทุกคนที่โพสต์หาคนที่ฝากที่ไม่ใช่ของตนเอง
        public IActionResult Geteveryorder()
        {
            var user = CheckUser(Request.Cookies["UserID"]);
            if (user == null)
            {
                return Unauthorized("Cookie Error");
            }
            //สร้าง list ของข้อมูลของคนที่ฝากซื้อแล้วยังไม่มีคนรับไป หรือที่ตนกดรับไป
            return Ok(_db.Food.Where(u => (u.Email != user && u.Status == 0) || (u.RiderEmail == user && u.Status == 1)).Select(f => new { f.Id, f.Username, f.Header, f.Description, f.Status }));
        }

        [HttpPost]
        //ผู้ใช้กดรับฝากซื้อหรือยกเลิกการับฝากซื้อ
        public IActionResult Updateorder([FromQuery] int OrderID, [FromQuery] int Status)
        {
            var user = CheckUser(Request.Cookies["UserID"]);
            if (user == null)
            {
                return Unauthorized("Cookie Error");
            }
            //หาข้อมูลจาก OrderID โดยที่จะต้องยังไม่มีผู้รับ order ไป
            var picked_order = _db.Food.FirstOrDefault(u => u.Id == OrderID && (u.RiderEmail == null || u.RiderEmail == user));
            var username = _db.Users.SingleOrDefault(u => u.email == user);
            if (picked_order == null || username == null)
            {
                return NotFound("Error, No Order from the id, Order could be taken,Or no User in DB");
            }
            string yibaction;
            string Message;
            switch (Status)
            {
                case 0:
                    yibaction = " ได้ทำการวาง ";
                    Message = picked_order.RaiderUsername + yibaction + picked_order.Header + " ของ " + picked_order.Username;
                    picked_order.RiderEmail = null;
                    picked_order.RaiderUsername = null;
                    break;
                case 1:
                    picked_order.RiderEmail = user;
                    picked_order.RaiderUsername = username.username;
                    yibaction = " ได้ทำการหยิบ ";
                    Message = picked_order.RaiderUsername + yibaction + picked_order.Header + " ของ " + picked_order.Username;
                    break;
                default:
                    return BadRequest("Error, Status code from frontend");

            }
            picked_order.Status = Status;
            //สร้างNotificationในการแจ้งเตือนผู้ใช้

            _db.Noti.Add(new NotificationModel(user, picked_order.Email, Message));
            _db.SaveChanges();
            return Ok();
        }
        private static string? CheckUser(string? user)
        {
            if (user == null)
            {
                return null;
            }
            user = Base64Decode(user);
            //ถ้าหากไม่มี user 
            if (!CheckEmail(user))
            {
                return null;
            }
            return user;
        }
        private static string Base64Decode(string input)
        {
            return System.Text.Encoding.UTF8.GetString(System.Convert.FromBase64String(input));
        }

        private static bool CheckEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false;
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }


    }
}
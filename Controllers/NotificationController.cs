﻿using Microsoft.AspNetCore.Mvc;
using my_new_app.Models;

namespace my_new_app.Controllers
{
    public class NotificationController : Controller
    {
        private readonly AppDBContext _db;
        public NotificationController(AppDBContext db)
        {
            _db = db;
        }
        
        [HttpGet]
        public IActionResult GetMyNoti()
        {
            var user = CheckUser(Request.Cookies["UserID"]);
            if (user == null)
            {
                return Unauthorized("Cookie Error");
            }
            return Ok(_db.Noti.Where(u => u.ReceverEmail == user).OrderByDescending(n => n.TimeCreate).Select(f => new { f.Id, f.Message }));
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

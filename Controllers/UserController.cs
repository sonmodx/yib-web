using Microsoft.AspNetCore.Mvc;
using my_new_app.Models;
using System.ComponentModel.DataAnnotations;

namespace my_new_app.Controllers
{

    public class UserController : Controller
    {
        private readonly AppDBContext _db;
        public UserController(AppDBContext db)
        {
            _db = db;
        }

        [HttpPost]
        //interface
        public IActionResult Register([FromBody] UserModel newUser)
        {
            var isUserExist = _db.Users.Any(u => u.email == newUser.email || u.username == newUser.username);
            // ยังไม่มี user
            if (!isUserExist)
            {
                _db.Users.Add(newUser);
                _db.SaveChanges();

                var option = new CookieOptions();
                option.Secure = true;
                option.HttpOnly = false;
                option.Expires = DateTimeOffset.UtcNow.AddHours(1);
                Response.Cookies.Append("UserID", Base64Encode(newUser.email), option);
                return Ok(newUser.username);
            }
            return BadRequest("Username or Email Exist");
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var user = _db.Users.SingleOrDefault(u => u.email == model.email && u.password == model.password);
            if (user == null)
            {
                return BadRequest();
            }
            var option = new CookieOptions();
            option.Secure = true;
            option.HttpOnly = false;
            option.Expires = DateTimeOffset.UtcNow.AddHours(1);
            Response.Cookies.Append("UserID", Base64Encode(model.email), option);
            return Ok(user.username);
        }
        [HttpPost]
        public IActionResult Logout()
        {
            if (Request.Cookies["UserID"] != null)
            {
                Response.Cookies.Delete("UserID");
                return Ok("The cookie deleted");
            }
            return BadRequest("Have you ever logged in?");
        }
        private static string Base64Encode(string input)
        {
            return System.Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(input));
        }

    }
}

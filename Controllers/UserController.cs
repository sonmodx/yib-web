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
            Console.WriteLine("{0} {1} {2}", newUser.Id, newUser.email, newUser.password);
            // ยังไม่มี user
            if (!isUserExist)
            {
                _db.Users.Add(newUser);
                _db.SaveChanges();

                var option = new CookieOptions();
                option.Secure = true;
                option.HttpOnly = true;
                option.Expires = DateTimeOffset.UtcNow.AddHours(1);
                Response.Cookies.Append("email", newUser.email, option);
                return Ok(newUser.username);
            }
            return BadRequest("Username or Email Exist");
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginModel model)
        {
            Console.WriteLine("{0} {1} ", model.email, model.password);

            var user = _db.Users.SingleOrDefault(u => u.email == model.email && u.password == model.password);
            if (user == null)
            {
                Console.WriteLine("I'm here");
                return BadRequest();
            }
            var option = new CookieOptions();
            option.Secure = true;
            option.HttpOnly = true;
            option.Expires = DateTimeOffset.UtcNow.AddHours(1);
            Response.Cookies.Append("email", model.email, option);

            return Ok(user.username);
        }

    }
}

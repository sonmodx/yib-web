using Microsoft.AspNetCore.Mvc;
using my_new_app.Models;

namespace my_new_app.Controllers
{

    public class UserController : Controller
    {
        private readonly AppDBContext _db;
        public UserController(AppDBContext db) { 
            _db = db;
        }
        
        [HttpPost]
        //interface
        public IActionResult Register([FromBody] UserModel newUser){
            _db.Users.Add(newUser);
            _db.SaveChanges();
            return Ok();
            //.where
        }

        [HttpPost]
        public IActionResult Login(string email,string password) {
            var user = _db.Users.SingleOrDefault(u=>u.email==email&&u.password==password);
            if (user == null){
                return BadRequest();
            }

            return Ok();
        }

    }
}

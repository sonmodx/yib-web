﻿using System.ComponentModel.DataAnnotations;

namespace my_new_app.Models
{
    public class LoginModel
    {
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        public LoginModel(string email, string password)
        {
            this.email = email;
            this.password = password;
        }
    }

}

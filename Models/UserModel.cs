using System.ComponentModel.DataAnnotations;

namespace my_new_app.Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        public UserModel(string username, string email, string password) {
            this.username = username;
            this.email = email;
            this.password = password;
        }
        
    }
    
}
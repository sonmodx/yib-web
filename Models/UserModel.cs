using System.ComponentModel.DataAnnotations;

namespace my_new_app.Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string username;
        [Required]
        [EmailAddress]
        public string email;
        [Required]
        public string password;
        public UserModel(string username, string email, string password) {
            this.username = username;
            this.email = email;
            this.password = password;
        }
        
    }
    
}
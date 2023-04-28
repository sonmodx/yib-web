using System.ComponentModel.DataAnnotations;

namespace my_new_app.Models
{

    public class NotificationModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string SenderEmail { get; set; }
        [Required]
        public string ReceverEmail { get; set; }
        [Required]
        public string Message { get; set; }

        public DateTime TimeCreate { get; set; }
        public NotificationModel(string SenderEmail, string ReceverEmail, string Message)
        {
            this.SenderEmail = SenderEmail;
            this.ReceverEmail = ReceverEmail;
            this.Message = Message;
            this.TimeCreate = DateTime.Now;
        }
    }
}

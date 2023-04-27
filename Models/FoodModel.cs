using System.ComponentModel.DataAnnotations;

namespace my_new_app.Models
{
    public class FoodModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Header { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int Status { get; set; }
        public string? RiderEmail { get; set; }
        /*
        Status state
        0 = กำลังรอคนมารับ
        1 = คนรับฝากแล้ว กำลังไปซื้อให้
        2 = ส่งให้แล้ว
        */
        public FoodModel(string Email, string Header, string Description, int Status)
        {
            this.Email = Email;
            this.Header = Header;
            this.Description = Description;
            this.Status = Status;
            this.RiderEmail = null;
        }
    }
}

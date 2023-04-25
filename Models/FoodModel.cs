using System.ComponentModel.DataAnnotations;

namespace my_new_app.Models
{
    public class FoodModel
    {
        public int Id { get; set; }
        [Required]
        public string Header { get; set; }
        [Required]
        public string Description { get; set; }
        public FoodModel(string Header, string Description)
        {
            this.Header = Header;
            this.Description = Description;
        }
    }
}

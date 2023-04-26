using System.ComponentModel.DataAnnotations;

namespace my_new_app.Models
{
    public class FarkModel
    {
        [Required]
        public string? Header { get; set; }
        [Required]
        public string? Description { get; set; }

    }
}

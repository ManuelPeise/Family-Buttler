using Shared.Models.Enums;
using System.ComponentModel.DataAnnotations;


namespace Data.CookingBookContext.Entities
{
    public class Menu
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public MenuType Type { get; set; }
        public string Description { get; set; }
        public string HowTo { get; set; }
    }
}

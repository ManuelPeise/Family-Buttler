using Shared.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Data.CookingBookContext.Entities
{
    public class Ingredient
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public IngredientType Type { get; set; }
    }
}

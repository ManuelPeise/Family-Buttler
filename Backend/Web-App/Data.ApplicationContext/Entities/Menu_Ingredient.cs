using Shared.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.CookingBookContext.Entities
{
    public class Menu_Ingredient
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("MenuId")]
        public int MenuId { get; set; }
        [ForeignKey("IngredientId")]
        public int IngredientId { get; set; }
        public int Amount { get; set; }
        public IngredientUnit Unit { get; set; }
    }
}

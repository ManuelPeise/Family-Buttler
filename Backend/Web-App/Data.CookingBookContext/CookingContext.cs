using Data.CookingBookContext.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.CookingBookContext
{
    public class CookingContext: DbContext
    {
        public CookingContext(DbContextOptions<CookingContext> options) : base(options)
        {

        }

        public DbSet<Menu> Menus { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Menu_Ingredient> MenuIngredients { get; set; }
    }
}

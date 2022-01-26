using Data.CookingBookContext.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.CookingBookContext
{
    public class AppContext: DbContext
    {
        public AppContext(DbContextOptions<AppContext> options) : base(options)
        {

        }

        public DbSet<Menu> Menus { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Menu_Ingredient> MenuIngredients { get; set; }
    }
}

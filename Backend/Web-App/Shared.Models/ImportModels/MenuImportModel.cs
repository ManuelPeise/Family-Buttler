using Shared.Models.Enums;
using System.Collections.Generic;

namespace Shared.Models.ImportModels
{
    public class MenuImportModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public MenuType MenuType { get; set; }
        public string Description { get; set; }
        public string HowTo { get; set; }
        public List<IngedientImportModel> Ingredients { get; set; }
    }

    public class IngedientImportModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IngredientType Type { get; set; }
        public int MenuId { get; set; }
        public int IngredientId { get; set; }
        public int Amount { get; set; }
        public IngredientUnit Unit { get; set; }
    }
}

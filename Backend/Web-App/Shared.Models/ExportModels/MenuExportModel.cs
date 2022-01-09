using Shared.Models.Enums;
using System.Collections.Generic;

namespace Shared.Models.ExportModels
{
    public class MenuExportModel
    {
        public List<ExportMenu> MenuCollection { get; set; }
        public MenuNotification Notification { get; set; }
    }

    public class ExportMenu
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string HowTo { get; set; }
        public MenuType MenuType { get; set; }
        public List<MenuIngredient> Ingredients { get; set; }
    }

    public class MenuIngredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Amount { get; set; }
        public IngredientUnit Unit { get; set; }
    }

    public class MenuNotification
    {
        public string Error { get; set; }
        public string ErrorDetails { get; set; }
    }
}

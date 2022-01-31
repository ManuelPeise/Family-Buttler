using System.Collections.Generic;

namespace Shared.Models.ExportModels
{
    public class MenuplanExportModel
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public List<MenuPlanEntryExportModel> MenuPlanEntries { get; set; }
    }
}

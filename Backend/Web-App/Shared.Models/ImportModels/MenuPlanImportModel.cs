using Shared.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Shared.Models.ImportModels
{
    public class MenuPlanImportModel
    {
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public List<MenuPlanEntryImportModel> MenuPlanEntries { get; set; }
    }

    public class MenuPlanEntryImportModel
    {
        public int Id { get; set; }
        public string MenuName { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public DayOfWeekEnum DayOfTheWeek { get; set; }
        public string Garnish { get; set; }
        public string Vegetable { get; set; }
    }
}

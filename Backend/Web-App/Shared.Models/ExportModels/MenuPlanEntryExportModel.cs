using Shared.Models.Enums;
using System;

namespace Shared.Models.ExportModels
{
    public class MenuPlanEntryExportModel
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

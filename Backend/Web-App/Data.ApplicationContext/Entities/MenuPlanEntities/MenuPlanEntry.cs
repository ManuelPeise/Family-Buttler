using Shared.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;


namespace Data.ApplicationContext.Entities.MenuPlanEntities
{
    public class MenuPlanEntry
    {
        [Key]
        public int Id { get; set; }
        public string MenuName { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public DayOfWeekEnum DayOfTheWeek { get; set; }
        public string Garnish { get; set; }
        public string Vegetable { get; set; }
        public MenuPlan MenuPlan { get; set; }
    }
}

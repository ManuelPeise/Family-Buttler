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
        public int DayOfTheWeek { get; set; }

        public string MenuId { get; set; }
        public MenuPlan MenuPlan { get; set; }
    }
}

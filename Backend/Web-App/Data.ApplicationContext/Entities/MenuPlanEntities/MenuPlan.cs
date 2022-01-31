using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Data.ApplicationContext.Entities.MenuPlanEntities
{
    public class MenuPlan
    {
        [Key]
        public int Id { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public List<MenuPlanEntry> MenuPlanEntries { get; set; }
    }
}

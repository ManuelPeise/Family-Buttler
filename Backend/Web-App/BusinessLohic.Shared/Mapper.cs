using Data.ApplicationContext.Entities.MenuPlanEntities;
using Data.LoggingContext.Entities;
using Shared.Models.ExportModels;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLohic.Shared
{
    public static class Mapper
    {
        public static LogMessageExportModel GetExportLogMessage(LogMessage msg)
        {
            return new LogMessageExportModel
            {
                Id = msg.Id,
                Message = msg.Message,
                Exception = msg.Exception,
                MessageType = msg.MessageType,
                TimeStamp = msg.TimeStamp,
            };
        }

        public static MenuplanExportModel GetMenuPlanExportModel(this MenuPlan menuPlan)
        {
            return new MenuplanExportModel
            {
                Id = menuPlan.Id,
                From = menuPlan.From,
                To = menuPlan.To,
                MenuPlanEntries = (from entry in menuPlan.MenuPlanEntries
                                   select new MenuPlanEntryExportModel
                                   {
                                       Id = entry.Id,
                                       Date = entry.Date,
                                       Description = entry.Description,
                                       MenuName = entry.MenuName,
                                       DayOfTheWeek = entry.DayOfTheWeek
                                   }).ToList(),
            };
        }
    }
}

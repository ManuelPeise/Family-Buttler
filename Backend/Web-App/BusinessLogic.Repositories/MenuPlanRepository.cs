using BusinessLohic.Shared;
using Data.ApplicationContext.Entities.MenuPlanEntities;
using Microsoft.EntityFrameworkCore;
using Shared.Models.Enums;
using Shared.Models.ExportModels;
using Shared.Models.ImportModels;
using Shared.Models.Interfaces;
using Shared.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Repositories
{
    public class MenuPlanRepository : IMenuPlanReopsitory
    {
        private bool disposedValue;
        private Data.ApplicationContext.AppDataContext _appContext;
        private ILoggingRepository _loggingRepository;

        public MenuPlanRepository(Data.ApplicationContext.AppDataContext appContext, ILoggingRepository loggingRepository)
        {
            _appContext = appContext;
            _loggingRepository = loggingRepository;
        }

        public async Task<List<MenuplanExportModel>> GetMenuPlans()
        {
            try
            {
                var menuPlans = (from plan in _appContext.MenuPlans
                                 select plan.GetMenuPlanExportModel()).ToList();

                return await Task.FromResult(menuPlans);
            }
            catch (Exception ex)
            {
                await _loggingRepository.SetLogMessage(new LoggingMessage
                {
                    Message = "Could not get menuplans from database!",
                    MessageType = LogMessageType.Error,
                    Exception = ex.Message,
                    TimeStamp = DateTime.Now
                });

                return new List<MenuplanExportModel>();
            }
        }

        public async Task AddOrUpdateMenuPlan(MenuPlanImportModel importModel)
        {
            try
            {
                var entry = _appContext.MenuPlans.Where(plan => plan.From == importModel.From && plan.To == importModel.To).FirstOrDefault();

                if (entry != null)
                {
                    await UpdateMenuPlan(importModel, entry);

                    return;
                }

               await AddMenuPlan(importModel);

            }
            catch (Exception ex)
            {
                await _loggingRepository.SetLogMessage(new LoggingMessage
                {
                    Message = "Could not add or update menuplan!",
                    MessageType = LogMessageType.Error,
                    Exception = ex.Message,
                    TimeStamp = DateTime.Now
                });
            }
        }

        private async Task UpdateMenuPlan(MenuPlanImportModel importModel, MenuPlan menuplan)
        {
            menuplan.From = importModel.From;
            menuplan.To = importModel.To;
            menuplan.MenuPlanEntries = (from entry in importModel.MenuPlanEntries
                                        select new MenuPlanEntry
                                        {
                                            Id = menuplan.Id,
                                            Date = entry.Date,
                                            DayOfTheWeek = entry.DayOfTheWeek,
                                            Description = entry.Description,
                                            Garnish = entry.Garnish,
                                            MenuName = entry.MenuName,
                                            MenuPlan = menuplan,
                                            Vegetable = entry.Vegetable,

                                        }).ToList();

            _appContext.Entry(menuplan).State = EntityState.Modified;

            await _appContext.SaveChangesAsync();
        }

        private async Task AddMenuPlan(MenuPlanImportModel importModel)
        {
            await _appContext.MenuPlans.AddAsync(new MenuPlan
            {
                From = importModel.From,
                To = importModel.To,
                MenuPlanEntries = new List<MenuPlanEntry>()
            });

            await _appContext.SaveChangesAsync();

            var plan = _appContext.MenuPlans.Where(plan => plan.From == importModel.From && plan.To == importModel.To).FirstOrDefault();

            var entries = (from model in importModel.MenuPlanEntries
                           select new MenuPlanEntry
                           {
                               MenuPlan = plan,
                               Date = model.Date,
                               DayOfTheWeek = model.DayOfTheWeek,
                               Description = model.Description,
                               Garnish = model.Garnish,
                               MenuName = model.MenuName,
                               Vegetable = model.Vegetable,
                           }).ToList();

            await _appContext.MenuPlanEntries.AddRangeAsync(entries);

            await _appContext.SaveChangesAsync();
        }

        #region dispose

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _appContext.Dispose();
                    _loggingRepository.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion

    }
}

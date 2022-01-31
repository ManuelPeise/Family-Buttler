using Shared.Models.ExportModels;
using Shared.Models.ImportModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shared.Models.Interfaces
{
    public interface IMenuPlanReopsitory: IDisposable
    {
        Task<List<MenuplanExportModel>> GetMenuPlans();
        Task AddOrUpdateMenuPlan(MenuPlanImportModel importModel);
    }
}

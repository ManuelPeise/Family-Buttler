using Microsoft.AspNetCore.Mvc;
using Shared.Models.ExportModels;
using Shared.Models.ImportModels;
using Shared.Models.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.MenuPlanService.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MenuPlan : ControllerBase
    {
        private IMenuPlanReopsitory _menuPlanRepository;

        public MenuPlan(IMenuPlanReopsitory menuPlanRepository)
        {
            _menuPlanRepository = menuPlanRepository;
        }

        [HttpGet(Name = "GetMenuPlanData")]
        public async Task<List<MenuplanExportModel>> GetMenuPlanData()
        {
            using (var menuPlanRepository = _menuPlanRepository)
            {
                return await menuPlanRepository.GetMenuPlans();
            }
        }

        [HttpPost(Name = "AddOrUpdateMenuPlan")]
        public async Task AddOrUpdateMenuPlan([FromBody] MenuPlanImportModel importModel)
        {
            using (var menuPlanRepository = _menuPlanRepository)
            {
                await menuPlanRepository.AddOrUpdateMenuPlan(importModel);
            }
        }


    }
}

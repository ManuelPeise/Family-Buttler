using Microsoft.AspNetCore.Mvc;
using Shared.Models.ExportModels;
using Shared.Models.ImportModels;
using Shared.Models.Interfaces;
using System.Threading.Tasks;

namespace Service.CookingBook.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class MenuController: ControllerBase
    {
        private ICookingBookRepository _cookingBookRepository;

        public MenuController(ICookingBookRepository cookingBookRepository)
        {
            _cookingBookRepository = cookingBookRepository;
        }

        [HttpGet(Name = "GetMenuCollection")]
        public async Task<MenuExportModel> GetMenuCollection()
        {
            using(var repo = _cookingBookRepository)
            {
                return await repo.GetMenus();
            }
        }

        [HttpPost(Name = "AddOrUpdateMenu")]
        public async Task AddOrUpdateMenu([FromBody]MenuImportModel importModel)
        {
            using(var repo = _cookingBookRepository)
            {
                await repo.AddOrUpdateMenu(importModel);
            }
        }

        [HttpDelete(Name = "DeleteMenu")]
        public async Task DeleteMenu(int id)
        {
            using (var repo = _cookingBookRepository)
            {
                await repo.DeleteMenu(id);
            }
        }
    }
}

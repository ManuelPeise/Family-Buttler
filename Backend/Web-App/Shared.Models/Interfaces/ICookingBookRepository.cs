using Shared.Models.ExportModels;
using Shared.Models.ImportModels;
using System;
using System.Threading.Tasks;

namespace Shared.Models.Interfaces
{
    public interface ICookingBookRepository: IDisposable
    {
        Task<MenuExportModel> GetMenus();

        Task AddTestData();

        Task AddOrUpdateMenu(MenuImportModel importModel);
       
        Task DeleteMenu(int id);

        
    }
}

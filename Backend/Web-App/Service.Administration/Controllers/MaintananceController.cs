using BusinessLogic.Shared;
using Data.ApplicationContext;
using Data.CookingBookContext;
using Data.LoggingContext;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Service.Administration.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]/")]
    public class MaintananceController: ControllerBase
    {
        private LogContext _logContext;
        private AppDataContext _cookingContext;

        public MaintananceController(LogContext logContext, AppDataContext cookingContext)
        {
            _logContext = logContext;
            _cookingContext = cookingContext;
        }

        [HttpGet("DbMigrationCheck")]
        public async Task DbMigrationCheck()
        {
            using(var dbMaintanance = new DataBaseMaintanance(_logContext, _cookingContext))
            {
                dbMaintanance.Execute();
            }
        }
    }
}

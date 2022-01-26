using Microsoft.AspNetCore.Mvc;
using Shared.Models.ExportModels;
using Shared.Models.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.Administration.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]/")]
    public class LoggingController : ControllerBase
    {
        private ILoggingRepository _loggingRepository;
        public LoggingController(ILoggingRepository loggingRepository)
        {
            _loggingRepository = loggingRepository;

        }

        [HttpGet(Name = "GetLogMessages")]
        public async Task<List<LogMessageExportModel>> GetLogMessages()
        {
            using (var repo = _loggingRepository)
            {
                return await repo.GetLogMessages();
            }
        }

        [HttpPost(Name = "DeleteLogmessages")]
        public async Task DeleteLogMessages([FromBody] int[] ids)
        {
            using (var repo = _loggingRepository)
            {
                await repo.DeleteLogMessages(ids);
            }
        }
    }
}

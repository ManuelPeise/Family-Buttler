using BusinessLogic.I18n;
using Microsoft.AspNetCore.Mvc;
using Shared.Models.Enums;
using Shared.Models.Interfaces;
using Shared.Models.Models;
using System;
using System.Threading.Tasks;

namespace Service.I18n.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]/")]
    public class I18nController: ControllerBase
    {
        private ILoggingRepository _logRepo;
        public I18nController(ILoggingRepository logRepo)
        {
            _logRepo = logRepo;
        }

        [HttpGet("{nameSpace}", Name = "GetValues")]
        public async Task<string> GetValues(string nameSpace)
        {
            try
            {
                using (var parser = new JsonValueParser(nameSpace))
                {
                    return await parser.ParseFile();
                }

                throw new Exception($"Loading values for language [{nameSpace.Replace("_", "/")}] failed!");

            }catch(Exception ex)
            {
                await _logRepo.SetLogMessage(new LoggingMessage
                {
                    MessageType = LogMessageType.Critical,
                    Message = "Could not load required values.",
                    TimeStamp = DateTime.Now,
                    Exception = ex.Message

                });

                return String.Empty;
            }
        }

    }
}

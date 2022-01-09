using BusinessLogic.I18n;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Service.I18n.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]/")]
    public class I18nController: ControllerBase
    {
        public I18nController()
        {

        }

        [HttpGet("{nameSpace}", Name = "GetValues")]
        public async Task<string> GetValues(string nameSpace)
        {
            using(var parser = new JsonValueParser(nameSpace))
            {
                return await parser.ParseFile();
            }
        }

    }
}

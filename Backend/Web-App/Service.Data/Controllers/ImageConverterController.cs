using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using BusinessLogic.Data;

namespace Service.Data.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public  class ImageConverterController: ControllerBase
    {


        [HttpPost]
        public async Task<byte[]> ConvertImage([FromForm]IFormFile image)
        {
            using (var converter = new ImageConverter(image))
            {
                return await Task.FromResult(await converter.GetByteString());
            }

           
        }
    }
}

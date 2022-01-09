using System.Threading.Tasks;

namespace Shared.Models.Interfaces
{
    public interface IHttpClientWrapper
    {
        Task<string> GetAsync(string url);
    }
}

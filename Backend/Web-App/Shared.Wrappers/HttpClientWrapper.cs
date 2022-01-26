using Shared.Models.Interfaces;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Shared.Wrappers
{
    public class HttpClientWrapper : IHttpClientWrapper
    {
        public HttpClientWrapper()
        {
            
        }

        public async Task<string> GetAsync(string url)
        {
            var response = string.Empty;

            using (var client = new HttpClient())
            {
                var requestMessage = new HttpRequestMessage
                {
                    RequestUri = new Uri(url),
                    Method = HttpMethod.Get,
                    Version = HttpVersion.Version11
                };

                var responseMessage = await client.SendAsync(requestMessage);

                if (responseMessage.IsSuccessStatusCode)
                {
                    response = await responseMessage.Content.ReadAsStringAsync();
                }
            }

            return response;
        }
    }
}

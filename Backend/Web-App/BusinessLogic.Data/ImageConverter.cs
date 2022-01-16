using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace BusinessLogic.Data
{
    public class ImageConverter : IDisposable
    {
        private bool disposedValue;

        private IFormFile _formFile;

        public ImageConverter(IFormFile formFile)
        {
            _formFile = formFile;
        }

        public async Task<byte[]> GetByteString()
        {
            var bytes = new byte[0];

            using (var stream = new MemoryStream())
            {
                if (_formFile.Length > 0)
                {
                    _formFile.CopyTo(stream);

                     bytes = stream.ToArray();
  
                }
            }

            return bytes;
        }



        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    
                }

                _formFile = null;

                disposedValue = true;
            }
        }

      
        public void Dispose()
        {
            // Ändern Sie diesen Code nicht. Fügen Sie Bereinigungscode in der Methode "Dispose(bool disposing)" ein.
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Shared.Models.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace BusinessLogic.I18n
{
    public class JsonValueParser : IDisposable
    {
        private string _nameSpace;
        private bool disposedValue;

        public JsonValueParser(string nameSpace)
        {
            _nameSpace = nameSpace;
        }

        public async Task<string> ParseFile()
        {
            using (var reader = new StreamReader($"I18n/{_nameSpace.Replace('_','/')}.json"))
            {
                var fileContent = reader.ReadToEnd();

                var jobj = JObject.Parse(fileContent);

                return jobj.ToString();
            }
        }

        #region dispose
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {

                }

                _nameSpace = null;

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            // Ändern Sie diesen Code nicht. Fügen Sie Bereinigungscode in der Methode "Dispose(bool disposing)" ein.
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}

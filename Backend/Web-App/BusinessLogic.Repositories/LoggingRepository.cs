using Data.LoggingContext;
using Shared.Models.ExportModels;
using Shared.Models.Interfaces;
using Shared.Models.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using BusinessLohic.Shared;

namespace BusinessLogic.Repositories
{
    public class LoggingRepository : ILoggingRepository
    {
        private bool disposedValue;

        private LogContext _logContext;

        public LoggingRepository(LogContext logContext)
        {
            _logContext = logContext;
        }

        public async Task<List<LogMessageExportModel>> GetLogMessages()
        {
            var messages = _logContext.LogMessages;

            if (!messages.Any())
            {
                return await Task.FromResult(new List<LogMessageExportModel>());
            }

            return await Task.FromResult((from msg in messages
                    select Mapper.GetExportLogMessage(msg)).ToList());
        }

        public async Task SetLogMessage(LogMessage msg)
        {
            await _logContext.AddAsync(new LogMessage
            {
                Message = msg.Message,
                MessageType = msg.MessageType,
                TimeStamp = msg.TimeStamp,
                Exception = msg.Exception,

            });
        }

        #region dispose
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _logContext.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}

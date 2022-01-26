using Shared.Models.ExportModels;
using Shared.Models.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shared.Models.Interfaces
{
    public interface ILoggingRepository: IDisposable
    {
        Task<List<LogMessageExportModel>> GetLogMessages();
        Task SetLogMessage(LoggingMessage msg);

        Task DeleteLogMessages(int[] ids);
    }
}

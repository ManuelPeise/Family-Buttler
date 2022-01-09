using Data.LoggingContext.Entities;
using Shared.Models.ExportModels;

namespace BusinessLohic.Shared
{
    public static class Mapper
    {
        public static LogMessageExportModel GetExportLogMessage(LogMessage msg)
        {
            return new LogMessageExportModel
            {
                Id = msg.Id,
                Message = msg.Message,
                Exception = msg.Exception,
                MessageType = msg.MessageType,
                TimeStamp = msg.TimeStamp,
            };
        }
    }
}

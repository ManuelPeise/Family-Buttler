using Shared.Models.Enums;
using System;

namespace Data.LoggingContext.Entities
{
    public class LogMessage
    {
        public int Id { get; set; }
        public DateTime TimeStamp { get; set; }
        public LogMessageType MessageType { get; set; }
        public string Message { get; set; }
        public string Exception { get; set; }

    }
}

using Data.LoggingContext.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data.LoggingContext
{
    public class LogContext: DbContext
    {
        public LogContext(DbContextOptions<LogContext> options) : base(options)
        {

        }

        public DbSet<LogMessage> LogMessages { get; set; }
    }
}

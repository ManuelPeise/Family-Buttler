using Data.ApplicationContext;
using Data.LoggingContext;

namespace BusinessLohic.Shared
{
    public abstract class BusinessLogicBase
    {
        public LogContext LogContext { get; set; }
        public AppDataContext AppDataContext { get; set; }
        
        public BusinessLogicBase()
        {

        }

        public BusinessLogicBase(LogContext logContext) : base()
        {
            LogContext = logContext;
        }

        public BusinessLogicBase(LogContext logContext, AppDataContext appDataContext): base()
        {
            LogContext = logContext;
            AppDataContext = appDataContext;
        }
    }
}

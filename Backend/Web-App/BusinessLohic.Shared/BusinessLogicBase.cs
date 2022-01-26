﻿using Data.CookingBookContext;
using Data.LoggingContext;

namespace BusinessLohic.Shared
{
    public abstract class BusinessLogicBase
    {
        public LogContext LogContext { get; set; }
        public AppContext CookingContext { get; set; }
        
        public BusinessLogicBase()
        {

        }

        public BusinessLogicBase(LogContext logContext) : base()
        {
            LogContext = logContext;
        }

        public BusinessLogicBase(LogContext logContext, AppContext cookingContext): base()
        {
            LogContext = logContext;
            CookingContext = cookingContext;
        }
    }
}

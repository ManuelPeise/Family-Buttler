using Data.ApplicationContext;
using Data.LoggingContext;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace BusinessLogic.Shared
{
    public class DataBaseMaintanance: IDisposable
    {
        private LogContext _logContext;
        private Data.ApplicationContext.AppDataContext _cookingContext;
        private bool disposedValue;

        public DataBaseMaintanance(LogContext logContext, AppDataContext cookingBookContext)
        {
            _logContext = logContext;
            _cookingContext = cookingBookContext;
        }

        public void Execute()
        {
            MigrateLogContext();

            MigrateCookingBookContext();
        }

        private void MigrateLogContext()
        {
            if (_logContext.Database.GetPendingMigrations().Any())
            {
                _logContext.Database.Migrate();
            }
        }

        private void MigrateCookingBookContext()
        {
            if (_cookingContext.Database.GetPendingMigrations().Any())
            {
                _cookingContext.Database.Migrate();
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _cookingContext.Dispose();
                    _logContext.Dispose();
                }

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

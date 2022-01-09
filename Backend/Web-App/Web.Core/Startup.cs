using Data.LoggingContext;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Data.CookingBookContext;
using Shared.Models.Interfaces;
using BusinessLogic.Repositories;
using Shared.Wrappers;
using BusinessLogic.Shared;

namespace Web.Core
{
    public class Startup
    {
        private string cornPolicy = "orginPolicy";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Web.Core", Version = "v1" });
            });

            services.AddDbContext<LogContext>(opt =>
            {
                opt.UseMySQL(Configuration.GetConnectionString("LogContext"));
            });

            services.AddDbContext<CookingContext>(opt =>
            {
                opt.UseMySQL(Configuration.GetConnectionString("CookingBookContext"));
            });

            services.AddScoped<ILoggingRepository, LoggingRepository>();
            services.AddScoped<ICookingBookRepository, CookingBookRepository>();

            services.AddCors(opt =>
            {
                opt.AddPolicy(name: cornPolicy, builder =>
                {
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowAnyOrigin();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
            public void Configure(IApplicationBuilder app, IWebHostEnvironment env, LogContext logContext, CookingContext cookingContext)
            {
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();

                }

                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Web.Core v1"));

                app.UseHttpsRedirection();

                app.UseRouting();

                app.UseCors(cornPolicy);

                app.UseAuthorization();

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });

                var apiBaseUrl = Configuration.GetSection("ApiBaseUrl").Value;

                var httpClientWrapper = new HttpClientWrapper();


                httpClientWrapper.GetAsync(apiBaseUrl + "Maintanance/DbMigrationCheck");

                httpClientWrapper.GetAsync(apiBaseUrl + "SeedCookingBookData/SeedMenuData");
            }
        }
    }

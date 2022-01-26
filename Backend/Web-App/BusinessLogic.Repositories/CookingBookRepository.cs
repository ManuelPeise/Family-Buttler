using BusinessLohic.Shared;
using Data.CookingBookContext;
using Data.CookingBookContext.Entities;
using Data.LoggingContext;
using Data.LoggingContext.Entities;
using Microsoft.EntityFrameworkCore;
using Shared.Models.Enums;
using Shared.Models.ExportModels;
using Shared.Models.ImportModels;
using Shared.Models.Interfaces;
using Shared.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogic.Repositories
{
    public class CookingBookRepository : BusinessLogicBase, ICookingBookRepository
    { 
        private bool disposedValue;
        private ILoggingRepository _logReopsitory;

        public CookingBookRepository(LogContext logContext, CookingContext cookingContext) : base(logContext, cookingContext) 
        { 
            _logReopsitory = new LoggingRepository(logContext);
        }

        public async Task<MenuExportModel> GetMenus()
        {
            try
            {
                var menuCollection = (from menu in CookingContext.Menus
                                      let ingredients = CookingContext.MenuIngredients.Where(m => m.MenuId == menu.Id).ToList()
                                      select new ExportMenu
                                      {
                                          Id = menu.Id,
                                          Name = menu.Name,
                                          Description = menu.Description,
                                          HowTo = menu.HowTo,
                                          MenuType = menu.Type,
                                          Image = menu.Image,
                                          Ingredients = (from i in ingredients
                                                         select new MenuIngredient
                                                         {
                                                             Id = i.Id,
                                                             Name = CookingContext.Ingredients.Single(x => x.Id == i.Id).Name,
                                                             Amount = i.Amount,
                                                             Unit = i.Unit
                                                         }).ToList()
                                      }).ToList();

                return await Task.FromResult(new MenuExportModel
                {
                    MenuCollection = menuCollection,
                    Notification = null
                });

            }
            catch (Exception ex)
            {
                await _logReopsitory.SetLogMessage(new LoggingMessage
                {
                    Message = "Could not get Menu's from database!",
                    MessageType = LogMessageType.Error,
                    Exception = ex.Message,
                    TimeStamp = DateTime.Now,

                });
                

                return await Task.FromResult(new MenuExportModel
                {
                    MenuCollection = new List<ExportMenu>(),
                    Notification = new MenuNotification
                    {
                        Error = "Could not load menu collection!",
                        ErrorDetails = ex.Message
                    }
                });
            }

        }

        public async Task AddOrUpdateMenu(MenuImportModel importModel)
        {
            try
            {
                var existingMenu = CookingContext.Menus.FirstOrDefault(menu => menu.Name.Equals(importModel.Name));

                await TryAddIngredients(importModel.Ingredients);

                if (existingMenu != null)
                {
                    await UpdateMenu(existingMenu, importModel);

                    await TryAddOrUpdateMenuIngredients(importModel, existingMenu.Id);

                    return;
                }

                var newMenu = new Menu
                {
                    Name = importModel.Name,
                    Description = importModel.Description,
                    HowTo = importModel.HowTo,
                    Type = importModel.MenuType,
                    Image = importModel.Image
                    
                };

                CookingContext.Menus.Add(newMenu);
                CookingContext.Entry(newMenu).State = EntityState.Added;

                await CookingContext.SaveChangesAsync();

                var maxMenuId = CookingContext.Menus.Max(x => x.Id);

                var menuId = CookingContext.Menus.FirstOrDefault(menu => menu.Id == maxMenuId);

                await TryAddOrUpdateMenuIngredients(importModel, maxMenuId);

            }
            catch (Exception ex)
            {
                await _logReopsitory.SetLogMessage(new LoggingMessage
                {
                    Message = "Could not add or update menu!",
                    MessageType = LogMessageType.Error,
                    Exception = ex.Message,
                    TimeStamp = DateTime.UtcNow
                });
            }
        }

        public async Task DeleteMenu(int id)
        {
            try
            {
                var menuIngredients = CookingContext.MenuIngredients.Where(x => x.MenuId == id).ToList();


                foreach (var ingredient in menuIngredients)
                {
                    CookingContext.Entry(ingredient).State = EntityState.Deleted;
                }

                CookingContext.MenuIngredients.RemoveRange(menuIngredients);

                await CookingContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                await _logReopsitory.SetLogMessage(new LoggingMessage
                {
                    Message = "Could not delete menu!",
                    MessageType = LogMessageType.Error,
                    Exception = ex.Message,
                    TimeStamp = DateTime.UtcNow
                });
            }
        }
        
        public async Task AddTestData()
        {
            try
            {
                await AddTestMenu();


            }catch (Exception ex)
            {
                await LogContext.LogMessages.AddAsync(new LogMessage
                {
                    Message = "Could add test data!",
                    MessageType = LogMessageType.Error,
                    Exception = ex.Message,
                    TimeStamp = DateTime.Now,
                });
            }
        }

        private async Task TryAddIngredients(List<IngedientImportModel> menueIngredients)
        {
            foreach (var ingredient in menueIngredients)
            {
                var existing = CookingContext.Ingredients.FirstOrDefault(ing => ing.Name.Equals(ingredient.Name) && ing.Type == ingredient.Type);

                if (existing != null)
                {
                    continue;
                }

                var newIngredient = new Ingredient
                {
                    Name = ingredient.Name,
                    Type = ingredient.Type,
                };

                CookingContext.Entry(newIngredient).State = EntityState.Added;

                CookingContext.Ingredients.Add(newIngredient);
            }

            await CookingContext.SaveChangesAsync();
        }

        private async Task TryAddOrUpdateMenuIngredients(MenuImportModel importModel, int menuId)
        {
            foreach (var ingredient in importModel.Ingredients)
            {
                var ingredientId = CookingContext.Ingredients.FirstOrDefault(ing => ing.Name.Equals(ingredient.Name)).Id;

                var existing = CookingContext.MenuIngredients.FirstOrDefault(x => x.MenuId == menuId && x.IngredientId == ingredientId);

                if (existing == null)
                {
                    var newIngrdient = new Menu_Ingredient
                    {
                        Amount = ingredient.Amount,
                        Unit = ingredient.Unit,
                        MenuId = menuId,
                        IngredientId = CookingContext.Ingredients.Single(ing => ing.Name.Equals(ingredient.Name)).Id,
                    };

                    CookingContext.MenuIngredients.Add(newIngrdient);

                    CookingContext.Entry(newIngrdient).State = EntityState.Added;

                    continue;
                }

                existing.MenuId = menuId;
                existing.Unit = ingredient.Unit;
                existing.Amount = ingredient.Amount;
                existing.IngredientId = ingredientId;

                CookingContext.Entry(existing).State = EntityState.Modified;
                CookingContext.MenuIngredients.Update(existing);
            }

            await CookingContext.SaveChangesAsync();
        }

        private async Task UpdateMenu(Menu existingMenu, MenuImportModel importModel)
        {
            existingMenu.Name = importModel.Name;
            existingMenu.Description = importModel.Description;
            existingMenu.HowTo = importModel.HowTo;
            existingMenu.Type = importModel.MenuType;

            CookingContext.Entry(existingMenu).State = EntityState.Modified;

            CookingContext.Menus.Update(existingMenu);

            await CookingContext.SaveChangesAsync();
        }

        private async Task AddTestMenu()
        {
            var menu = new MenuImportModel
            {
                Name = "Spagetti Bolognese",
                Description = "Cooking",
                HowTo = "...",
                MenuType = MenuType.Pasta,
                Ingredients = new List<IngedientImportModel>
                    {
                        new IngedientImportModel
                        {
                             Amount = 1,
                             Name = "Onion",
                             Type = IngredientType.Vegatable,
                             Unit = IngredientUnit.Piece,
                        },
                        new IngedientImportModel
                        {
                             Amount = 200,
                             Name = "Cow",
                             Type = IngredientType.Meat,
                             Unit = IngredientUnit.Gram,
                        },
                        new IngedientImportModel
                        {
                             Amount = 1,
                             Name = "Pepper",
                             Type = IngredientType.Seasoning,
                             Unit = IngredientUnit.Kilo,
                        },
                        new IngedientImportModel
                        {
                             Amount = 2,
                             Name = "Salt",
                             Type = IngredientType.Seasoning,
                             Unit = IngredientUnit.Kilo,
                        }
                    }
            };

            await AddOrUpdateMenu(menu);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    this.CookingContext.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}

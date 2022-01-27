using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

namespace Data.CookingBookContext.Migrations
{
    public partial class addMenuplan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MenuPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    From = table.Column<string>(type: "text", nullable: false),
                    To = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuPlans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MenuPlanEntries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    MenuName = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime", nullable: false),
                    DayOfTheWeek = table.Column<int>(type: "int", nullable: false),
                    MenuId = table.Column<string>(type: "text", nullable: false),
                    MenuPlanId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuPlanEntries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MenuPlanEntries_MenuPlans_MenuPlanId",
                        column: x => x.MenuPlanId,
                        principalTable: "MenuPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MenuPlanEntries_MenuPlanId",
                table: "MenuPlanEntries",
                column: "MenuPlanId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MenuPlanEntries");

            migrationBuilder.DropTable(
                name: "MenuPlans");
        }
    }
}

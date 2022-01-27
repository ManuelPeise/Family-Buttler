﻿// <auto-generated />
using System;
using Data.CookingBookContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Data.CookingBookContext.Migrations
{
    [DbContext(typeof(AppContext))]
    partial class CookingContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 64)
                .HasAnnotation("ProductVersion", "5.0.13");

            modelBuilder.Entity("Data.ApplicationContext.Entities.MenuPlanEntities.MenuPlan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("From")
                        .HasColumnType("text");

                    b.Property<string>("To")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("MenuPlans");
                });

            modelBuilder.Entity("Data.ApplicationContext.Entities.MenuPlanEntities.MenuPlanEntry", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<int>("DayOfTheWeek")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("MenuId")
                        .HasColumnType("text");

                    b.Property<string>("MenuName")
                        .HasColumnType("text");

                    b.Property<int?>("MenuPlanId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("MenuPlanId");

                    b.ToTable("MenuPlanEntries");
                });

            modelBuilder.Entity("Data.CookingBookContext.Entities.Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("Data.CookingBookContext.Entities.Menu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("HowTo")
                        .HasColumnType("text");

                    b.Property<string>("Image")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Menus");
                });

            modelBuilder.Entity("Data.CookingBookContext.Entities.Menu_Ingredient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int>("IngredientId")
                        .HasColumnType("int");

                    b.Property<int>("MenuId")
                        .HasColumnType("int");

                    b.Property<int>("Unit")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("MenuIngredients");
                });

            modelBuilder.Entity("Data.ApplicationContext.Entities.MenuPlanEntities.MenuPlanEntry", b =>
                {
                    b.HasOne("Data.ApplicationContext.Entities.MenuPlanEntities.MenuPlan", "MenuPlan")
                        .WithMany("MenuPlanEntries")
                        .HasForeignKey("MenuPlanId");

                    b.Navigation("MenuPlan");
                });

            modelBuilder.Entity("Data.ApplicationContext.Entities.MenuPlanEntities.MenuPlan", b =>
                {
                    b.Navigation("MenuPlanEntries");
                });
#pragma warning restore 612, 618
        }
    }
}

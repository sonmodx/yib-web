using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace my_new_app.Migrations
{
    /// <inheritdoc />
    public partial class FoodUsername : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeCreate",
                table: "Noti",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)",
                oldRowVersion: true)
                .OldAnnotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.ComputedColumn);

            migrationBuilder.AddColumn<string>(
                name: "RaiderUsername",
                table: "Food",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Username",
                table: "Food",
                type: "longtext",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RaiderUsername",
                table: "Food");

            migrationBuilder.DropColumn(
                name: "Username",
                table: "Food");

            migrationBuilder.AlterColumn<DateTime>(
                name: "TimeCreate",
                table: "Noti",
                type: "datetime(6)",
                rowVersion: true,
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)")
                .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.ComputedColumn);
        }
    }
}

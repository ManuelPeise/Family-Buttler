CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) NOT NULL,
    `ProductVersion` varchar(32) NOT NULL,
    PRIMARY KEY (`MigrationId`)
);

START TRANSACTION;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20211222215949_initDb')
BEGIN
    CREATE TABLE `Ingredients` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `Name` text NOT NULL,
        `Type` int NOT NULL,
        PRIMARY KEY (`Id`)
    );
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20211222215949_initDb')
BEGIN
    CREATE TABLE `MenuIngredients` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `MenuId` int NOT NULL,
        `IngredientId` int NOT NULL,
        `Amount` int NOT NULL,
        `Unit` int NOT NULL,
        PRIMARY KEY (`Id`)
    );
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20211222215949_initDb')
BEGIN
    CREATE TABLE `Menus` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `Name` text NOT NULL,
        `Type` int NOT NULL,
        `Description` text NOT NULL,
        `HowTo` text NULL,
        PRIMARY KEY (`Id`)
    );
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20211222215949_initDb')
BEGIN
    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20211222215949_initDb', '5.0.13');
END;

COMMIT;

START TRANSACTION;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20220110212343_add-image')
BEGIN
    ALTER TABLE `Menus` ADD `Image` longText NULL;
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20220110212343_add-image')
BEGIN
    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20220110212343_add-image', '5.0.13');
END;

COMMIT;


CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) NOT NULL,
    `ProductVersion` varchar(32) NOT NULL,
    PRIMARY KEY (`MigrationId`)
);

START TRANSACTION;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20211222215617_initDb')
BEGIN
    CREATE TABLE `LogMessages` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `TimeStamp` datetime NOT NULL,
        `MessageType` int NOT NULL,
        `Message` text NULL,
        `Exception` text NULL,
        PRIMARY KEY (`Id`)
    );
END;

IF NOT EXISTS(SELECT * FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20211222215617_initDb')
BEGIN
    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20211222215617_initDb', '5.0.13');
END;

COMMIT;


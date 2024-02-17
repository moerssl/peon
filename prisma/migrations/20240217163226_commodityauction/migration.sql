-- CreateTable
CREATE TABLE `commodityAuction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemsId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdated` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TRIGGER set_commodityAuction_createdAt
BEFORE INSERT ON commodityAuction
FOR EACH ROW
SET NEW.createdAt = NOW();

CREATE TRIGGER set_commodityAuction_lastUpdated
BEFORE UPDATE ON commodityAuction
FOR EACH ROW
SET NEW.lastUpdated = NOW();
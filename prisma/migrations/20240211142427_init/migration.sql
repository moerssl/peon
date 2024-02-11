-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NULL,
    `petSpeciesId` INTEGER NULL,
    `quantity` INTEGER NOT NULL,
    `marketValue` INTEGER NOT NULL,
    `avgSalePrice` INTEGER NOT NULL,
    `saleRate` DOUBLE NOT NULL,
    `soldPerDay` DOUBLE NOT NULL,
    `historical` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NULL,
    `petSpeciesId` INTEGER NULL,
    `quantity` INTEGER NOT NULL,
    `marketValue` INTEGER NOT NULL,
    `avgSalePrice` INTEGER NOT NULL,
    `saleRate` DOUBLE NOT NULL,
    `soldPerDay` DOUBLE NOT NULL,
    `historical` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NULL,
    `petSpeciesId` INTEGER NULL,
    `quantity` INTEGER NOT NULL,
    `marketValue` INTEGER NOT NULL,
    `avgSalePrice` INTEGER NOT NULL,
    `saleRate` DOUBLE NOT NULL,
    `soldPerDay` DOUBLE NOT NULL,
    `historical` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PetHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NULL,
    `petSpeciesId` INTEGER NULL,
    `quantity` INTEGER NOT NULL,
    `marketValue` INTEGER NOT NULL,
    `avgSalePrice` INTEGER NOT NULL,
    `saleRate` DOUBLE NOT NULL,
    `soldPerDay` DOUBLE NOT NULL,
    `historical` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

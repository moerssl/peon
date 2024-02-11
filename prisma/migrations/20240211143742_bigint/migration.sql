/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ItemHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PetHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Item` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `itemId` BIGINT NULL,
    MODIFY `petSpeciesId` BIGINT NULL,
    MODIFY `quantity` BIGINT NOT NULL,
    MODIFY `marketValue` BIGINT NOT NULL,
    MODIFY `avgSalePrice` BIGINT NOT NULL,
    MODIFY `historical` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ItemHistory` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `itemId` BIGINT NULL,
    MODIFY `petSpeciesId` BIGINT NULL,
    MODIFY `quantity` BIGINT NOT NULL,
    MODIFY `marketValue` BIGINT NOT NULL,
    MODIFY `avgSalePrice` BIGINT NOT NULL,
    MODIFY `historical` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Pet` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `itemId` BIGINT NULL,
    MODIFY `petSpeciesId` BIGINT NULL,
    MODIFY `quantity` BIGINT NOT NULL,
    MODIFY `marketValue` BIGINT NOT NULL,
    MODIFY `avgSalePrice` BIGINT NOT NULL,
    MODIFY `historical` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `PetHistory` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `itemId` BIGINT NULL,
    MODIFY `petSpeciesId` BIGINT NULL,
    MODIFY `quantity` BIGINT NOT NULL,
    MODIFY `marketValue` BIGINT NOT NULL,
    MODIFY `avgSalePrice` BIGINT NOT NULL,
    MODIFY `historical` BIGINT NOT NULL,
    ADD PRIMARY KEY (`id`);

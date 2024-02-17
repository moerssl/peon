-- AlterTable
ALTER TABLE `Item` ADD COLUMN `regionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `ItemHistory` ADD COLUMN `regionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Pet` ADD COLUMN `regionId` INTEGER NULL;

-- AlterTable
ALTER TABLE `PetHistory` ADD COLUMN `regionId` INTEGER NULL;

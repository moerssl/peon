/*
  Warnings:

  - You are about to drop the column `itemId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `petSpeciesId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `petSpeciesId` on the `ItemHistory` table. All the data in the column will be lost.
  - The primary key for the `Pet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Pet` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `PetHistory` table. All the data in the column will be lost.
  - Made the column `itemId` on table `ItemHistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `petSpeciesId` on table `Pet` required. This step will fail if there are existing NULL values in that column.

*/
-- Start with fresh data
TRUNCATE TABLE `Item`;
TRUNCATE TABLE `ItemHistory`;
TRUNCATE TABLE `Pet`;
TRUNCATE TABLE `PetHistory`;

-- AlterTable
ALTER TABLE `Item` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `petSpeciesId`,
    MODIFY `itemId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`itemId`);

-- AlterTable
ALTER TABLE `ItemHistory` DROP COLUMN `petSpeciesId`,
    MODIFY `itemId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `Pet` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `itemId`,
    MODIFY `petSpeciesId` BIGINT NOT NULL,
    ADD PRIMARY KEY (`petSpeciesId`);

-- AlterTable
ALTER TABLE `PetHistory` DROP COLUMN `itemId`;

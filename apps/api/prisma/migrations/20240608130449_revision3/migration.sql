/*
  Warnings:

  - You are about to drop the column `listingsId` on the `nonavailability` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomsId` to the `nonavailability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `nonavailability` DROP FOREIGN KEY `nonavailability_listingsId_fkey`;

-- AlterTable
ALTER TABLE `nonavailability` DROP COLUMN `listingsId`,
    ADD COLUMN `roomsId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);

-- AddForeignKey
ALTER TABLE `nonavailability` ADD CONSTRAINT `nonavailability_roomsId_fkey` FOREIGN KEY (`roomsId`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `roomsId` on the `nonavailability` table. All the data in the column will be lost.
  - You are about to drop the column `roomsId` on the `room_images` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `listingsId` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `total_bookings` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the `_facilitiestolistings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_roomstoseasonal_prices` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[display_name]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `room_typesId` to the `nonavailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_typesId` to the `room_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_typesId` to the `seasonal_prices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_facilitiestolistings` DROP FOREIGN KEY `_facilitiesTolistings_A_fkey`;

-- DropForeignKey
ALTER TABLE `_facilitiestolistings` DROP FOREIGN KEY `_facilitiesTolistings_B_fkey`;

-- DropForeignKey
ALTER TABLE `_roomstoseasonal_prices` DROP FOREIGN KEY `_roomsToseasonal_prices_A_fkey`;

-- DropForeignKey
ALTER TABLE `_roomstoseasonal_prices` DROP FOREIGN KEY `_roomsToseasonal_prices_B_fkey`;

-- DropForeignKey
ALTER TABLE `nonavailability` DROP FOREIGN KEY `nonavailability_roomsId_fkey`;

-- DropForeignKey
ALTER TABLE `room_images` DROP FOREIGN KEY `room_images_roomsId_fkey`;

-- DropForeignKey
ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_listingsId_fkey`;

-- AlterTable
ALTER TABLE `nonavailability` DROP COLUMN `roomsId`,
    ADD COLUMN `room_typesId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `room_images` DROP COLUMN `roomsId`,
    ADD COLUMN `room_typesId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `rooms` DROP COLUMN `capacity`,
    DROP COLUMN `description`,
    DROP COLUMN `listingsId`,
    DROP COLUMN `name`,
    DROP COLUMN `price`,
    DROP COLUMN `stock`,
    DROP COLUMN `total_bookings`;

-- AlterTable
ALTER TABLE `seasonal_prices` ADD COLUMN `room_typesId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_facilitiestolistings`;

-- DropTable
DROP TABLE `_roomstoseasonal_prices`;

-- CreateTable
CREATE TABLE `listing_facilities` (
    `listingsId` INTEGER NOT NULL,
    `facilitiesId` INTEGER NOT NULL,

    PRIMARY KEY (`listingsId`, `facilitiesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `stock` INTEGER NOT NULL DEFAULT 1,
    `total_bookings` INTEGER NOT NULL,
    `capacity` INTEGER NOT NULL,
    `bed_details` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `listingsId` INTEGER NOT NULL,
    `has_breakfast_option` BOOLEAN NOT NULL DEFAULT false,
    `breakfast_price` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_facilities` (
    `room_typesId` INTEGER NOT NULL,
    `facilitiesId` INTEGER NOT NULL,

    PRIMARY KEY (`room_typesId`, `facilitiesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tenants_display_name_key` ON `tenants`(`display_name`);

-- AddForeignKey
ALTER TABLE `listing_facilities` ADD CONSTRAINT `listing_facilities_listingsId_fkey` FOREIGN KEY (`listingsId`) REFERENCES `listings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `listing_facilities` ADD CONSTRAINT `listing_facilities_facilitiesId_fkey` FOREIGN KEY (`facilitiesId`) REFERENCES `facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_types` ADD CONSTRAINT `room_types_listingsId_fkey` FOREIGN KEY (`listingsId`) REFERENCES `listings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_facilities` ADD CONSTRAINT `room_facilities_room_typesId_fkey` FOREIGN KEY (`room_typesId`) REFERENCES `room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_facilities` ADD CONSTRAINT `room_facilities_facilitiesId_fkey` FOREIGN KEY (`facilitiesId`) REFERENCES `facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nonavailability` ADD CONSTRAINT `nonavailability_room_typesId_fkey` FOREIGN KEY (`room_typesId`) REFERENCES `room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_images` ADD CONSTRAINT `room_images_room_typesId_fkey` FOREIGN KEY (`room_typesId`) REFERENCES `room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seasonal_prices` ADD CONSTRAINT `seasonal_prices_room_typesId_fkey` FOREIGN KEY (`room_typesId`) REFERENCES `room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

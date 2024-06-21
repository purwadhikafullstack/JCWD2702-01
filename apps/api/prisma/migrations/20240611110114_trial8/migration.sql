/*
  Warnings:

  - You are about to drop the column `roomsId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the column `tenantsId` on the `bookings` table. All the data in the column will be lost.
  - The primary key for the `listings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `listingsId` on the `nonavailability` table. All the data in the column will be lost.
  - You are about to drop the column `roomsId` on the `room_images` table. All the data in the column will be lost.
  - You are about to drop the `_facilitiestolistings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_roomstoseasonal_prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
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
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_promotionsId_fkey`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_roomsId_fkey`;

-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_tenantsId_fkey`;

-- DropForeignKey
ALTER TABLE `listing_images` DROP FOREIGN KEY `listing_images_listingsId_fkey`;

-- DropForeignKey
ALTER TABLE `nonavailability` DROP FOREIGN KEY `nonavailability_listingsId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_listingsId_fkey`;

-- DropForeignKey
ALTER TABLE `room_images` DROP FOREIGN KEY `room_images_roomsId_fkey`;

-- DropForeignKey
ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_listingsId_fkey`;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `roomsId`,
    DROP COLUMN `tenantsId`,
    ADD COLUMN `booking_statusId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `details` JSON NULL,
    ADD COLUMN `room_typesId` INTEGER NULL,
    MODIFY `promotionsId` INTEGER NULL;

-- AlterTable
ALTER TABLE `listing_images` MODIFY `listingsId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `listings` DROP PRIMARY KEY,
    ADD COLUMN `slug` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `nonavailability` DROP COLUMN `listingsId`,
    ADD COLUMN `room_typesId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reviews` MODIFY `listingsId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room_images` DROP COLUMN `roomsId`,
    ADD COLUMN `room_typesId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `seasonal_prices` ADD COLUMN `room_typesId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_facilitiestolistings`;

-- DropTable
DROP TABLE `_roomstoseasonal_prices`;

-- DropTable
DROP TABLE `rooms`;

-- CreateTable
CREATE TABLE `listing_facilities` (
    `listingsId` VARCHAR(191) NOT NULL,
    `facilitiesId` INTEGER NOT NULL,

    PRIMARY KEY (`listingsId`, `facilitiesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_types` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `stock` INTEGER NOT NULL DEFAULT 1,
    `capacity` INTEGER NOT NULL,
    `bed_details` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `listingsId` VARCHAR(191) NOT NULL,
    `has_breakfast_option` BOOLEAN NOT NULL DEFAULT false,
    `breakfast_price` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_facilities` (
    `room_typesId` INTEGER NOT NULL,
    `facilitiesId` INTEGER NOT NULL,

    PRIMARY KEY (`room_typesId`, `facilitiesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `listing_images` ADD CONSTRAINT `listing_images_listingsId_fkey` FOREIGN KEY (`listingsId`) REFERENCES `listings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_images` ADD CONSTRAINT `room_images_room_typesId_fkey` FOREIGN KEY (`room_typesId`) REFERENCES `room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seasonal_prices` ADD CONSTRAINT `seasonal_prices_room_typesId_fkey` FOREIGN KEY (`room_typesId`) REFERENCES `room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_room_typesId_fkey` FOREIGN KEY (`room_typesId`) REFERENCES `room_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_promotionsId_fkey` FOREIGN KEY (`promotionsId`) REFERENCES `promotions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_booking_statusId_fkey` FOREIGN KEY (`booking_statusId`) REFERENCES `booking_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_listingsId_fkey` FOREIGN KEY (`listingsId`) REFERENCES `listings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

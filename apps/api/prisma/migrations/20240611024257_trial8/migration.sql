/*
  Warnings:

  - You are about to drop the column `roomsId` on the `bookings` table. All the data in the column will be lost.
  - The primary key for the `listing_facilities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `listings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `total_bookings` on the `room_types` table. All the data in the column will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_roomsId_fkey`;

-- DropForeignKey
ALTER TABLE `listing_facilities` DROP FOREIGN KEY `listing_facilities_listingsId_fkey`;

-- DropForeignKey
ALTER TABLE `listing_images` DROP FOREIGN KEY `listing_images_listingsId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_listingsId_fkey`;

-- DropForeignKey
ALTER TABLE `room_types` DROP FOREIGN KEY `room_types_listingsId_fkey`;

-- DropForeignKey
ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_room_typesId_fkey`;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `roomsId`,
    ADD COLUMN `details` JSON NULL,
    ADD COLUMN `room_typesId` INTEGER NULL;

-- AlterTable
ALTER TABLE `listing_facilities` DROP PRIMARY KEY,
    MODIFY `listingsId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`listingsId`, `facilitiesId`);

-- AlterTable
ALTER TABLE `listing_images` MODIFY `listingsId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `listings` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reviews` MODIFY `listingsId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room_types` DROP COLUMN `total_bookings`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `listingsId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `rooms`;

-- AddForeignKey
ALTER TABLE `listing_facilities` ADD CONSTRAINT `listing_facilities_listingsId_fkey` FOREIGN KEY (`listingsId`) REFERENCES `listings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_types` ADD CONSTRAINT `room_types_listingsId_fkey` FOREIGN KEY (`listingsId`) REFERENCES `listings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `listing_images` ADD CONSTRAINT `listing_images_listingsId_fkey` FOREIGN KEY (`listingsId`) REFERENCES `listings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_room_typesId_fkey` FOREIGN KEY (`room_typesId`) REFERENCES `room_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_listingsId_fkey` FOREIGN KEY (`listingsId`) REFERENCES `listings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

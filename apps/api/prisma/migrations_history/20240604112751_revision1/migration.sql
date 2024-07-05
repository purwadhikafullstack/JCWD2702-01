/*
  Warnings:

  - You are about to alter the column `total_price` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `location` on the `listings` table. All the data in the column will be lost.
  - You are about to drop the column `seasonal_pricesId` on the `rooms` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `rooms` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to alter the column `price` on the `seasonal_prices` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(11,2)`.
  - You are about to drop the column `id_number` on the `tenants` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tenantsId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usersId]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `booking_histories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `listing_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_person` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_coordinate` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `listings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `nonavailability` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `room_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_bookings` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `seasonal_prices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersId` to the `tenants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_seasonal_pricesId_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_tenantsId_fkey`;

-- AlterTable
ALTER TABLE `booking_histories` ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `bookings` MODIFY `usersId` VARCHAR(191) NOT NULL,
    MODIFY `total_price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `listing_images` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `listings` DROP COLUMN `location`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact_person` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `location_coordinate` JSON NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `nonavailability` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `promotions` ADD COLUMN `amount` DECIMAL(4, 2) NOT NULL,
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `usersId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room_images` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `rooms` DROP COLUMN `seasonal_pricesId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `total_bookings` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `price` DECIMAL(11, 2) NOT NULL;

-- AlterTable
ALTER TABLE `seasonal_prices` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `price` DECIMAL(11, 2) NOT NULL;

-- AlterTable
ALTER TABLE `tenants` DROP COLUMN `id_number`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `id_card_number` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `usersId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `tenantsId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `_roomsToseasonal_prices` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_roomsToseasonal_prices_AB_unique`(`A`, `B`),
    INDEX `_roomsToseasonal_prices_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tenants_usersId_key` ON `tenants`(`usersId`);

-- AddForeignKey
ALTER TABLE `tenants` ADD CONSTRAINT `tenants_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_roomsToseasonal_prices` ADD CONSTRAINT `_roomsToseasonal_prices_A_fkey` FOREIGN KEY (`A`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_roomsToseasonal_prices` ADD CONSTRAINT `_roomsToseasonal_prices_B_fkey` FOREIGN KEY (`B`) REFERENCES `seasonal_prices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

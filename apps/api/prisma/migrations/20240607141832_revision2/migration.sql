/*
  Warnings:

  - Added the required column `city` to the `listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `listings` ADD COLUMN `avg_rating` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `click_rate` INTEGER NULL;

-- CreateTable
CREATE TABLE `bank_details` (
    `id` VARCHAR(191) NOT NULL,
    `tenantsId` VARCHAR(191) NOT NULL,
    `card_holder_name` VARCHAR(191) NOT NULL,
    `card_number` VARCHAR(191) NOT NULL,
    `exp_date` DATETIME(3) NOT NULL,
    `cvv` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `bank_details_tenantsId_key`(`tenantsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bank_details` ADD CONSTRAINT `bank_details_tenantsId_fkey` FOREIGN KEY (`tenantsId`) REFERENCES `tenants`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

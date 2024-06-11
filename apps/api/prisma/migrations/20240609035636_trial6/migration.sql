-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_promotionsId_fkey`;

-- AlterTable
ALTER TABLE `bookings` MODIFY `promotionsId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_promotionsId_fkey` FOREIGN KEY (`promotionsId`) REFERENCES `promotions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

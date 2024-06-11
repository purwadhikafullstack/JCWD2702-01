-- AlterTable
ALTER TABLE `bookings` ADD COLUMN `booking_statusId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_booking_statusId_fkey` FOREIGN KEY (`booking_statusId`) REFERENCES `booking_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

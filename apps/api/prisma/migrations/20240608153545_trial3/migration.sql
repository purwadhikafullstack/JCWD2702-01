/*
  Warnings:

  - Added the required column `room_typesId` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rooms` ADD COLUMN `room_typesId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_room_typesId_fkey` FOREIGN KEY (`room_typesId`) REFERENCES `room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

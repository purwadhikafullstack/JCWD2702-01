/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - The required column `uid` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_usersId_fkey`;

-- DropForeignKey
ALTER TABLE `tenants` DROP FOREIGN KEY `tenants_usersId_fkey`;

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `uid` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`uid`);

-- AddForeignKey
ALTER TABLE `tenants` ADD CONSTRAINT `tenants_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

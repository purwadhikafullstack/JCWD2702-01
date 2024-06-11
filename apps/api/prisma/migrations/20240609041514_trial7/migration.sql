/*
  Warnings:

  - You are about to drop the column `tenantsId` on the `bookings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `bookings` DROP FOREIGN KEY `bookings_tenantsId_fkey`;

-- AlterTable
ALTER TABLE `bookings` DROP COLUMN `tenantsId`;

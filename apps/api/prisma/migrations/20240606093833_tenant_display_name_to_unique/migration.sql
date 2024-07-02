/*
  Warnings:

  - A unique constraint covering the columns `[display_name]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tenants_display_name_key` ON `tenants`(`display_name`);

/*
  Warnings:

  - You are about to drop the `media_files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "novels" DROP CONSTRAINT "novels_image_url_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_profile_image_url_fkey";

-- DropTable
DROP TABLE "media_files";

-- DropEnum
DROP TYPE "MediaFileType";

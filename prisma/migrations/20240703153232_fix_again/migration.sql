/*
  Warnings:

  - Made the column `image_url` on table `novels` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "novels" DROP CONSTRAINT "novels_image_url_fkey";

-- AlterTable
ALTER TABLE "novels" ALTER COLUMN "image_url" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "novels" ADD CONSTRAINT "novels_image_url_fkey" FOREIGN KEY ("image_url") REFERENCES "media_files"("url") ON DELETE RESTRICT ON UPDATE CASCADE;

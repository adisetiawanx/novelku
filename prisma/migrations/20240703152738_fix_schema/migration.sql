-- DropForeignKey
ALTER TABLE "novels" DROP CONSTRAINT "novels_image_url_fkey";

-- AlterTable
ALTER TABLE "novels" ALTER COLUMN "image_url" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "novels" ADD CONSTRAINT "novels_image_url_fkey" FOREIGN KEY ("image_url") REFERENCES "media_files"("url") ON DELETE SET NULL ON UPDATE CASCADE;

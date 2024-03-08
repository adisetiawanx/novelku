-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_profile_image_url_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "profile_image_url" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profile_image_url_fkey" FOREIGN KEY ("profile_image_url") REFERENCES "media_files"("url") ON DELETE SET NULL ON UPDATE CASCADE;

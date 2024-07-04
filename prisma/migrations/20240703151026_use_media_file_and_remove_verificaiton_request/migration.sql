/*
  Warnings:

  - You are about to drop the `verification_requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MediaFileType" AS ENUM ('IMAGE', 'VIDEO', 'AUDIO');

-- DropTable
DROP TABLE "verification_requests";

-- CreateTable
CREATE TABLE "media_files" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "MediaFileType" NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_files_url_key" ON "media_files"("url");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_profile_image_url_fkey" FOREIGN KEY ("profile_image_url") REFERENCES "media_files"("url") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novels" ADD CONSTRAINT "novels_image_url_fkey" FOREIGN KEY ("image_url") REFERENCES "media_files"("url") ON DELETE RESTRICT ON UPDATE CASCADE;

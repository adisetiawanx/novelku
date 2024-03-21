-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('PUBLISHED', 'DRAFT', 'ARCHIVED');

-- AlterTable
ALTER TABLE "novels" ADD COLUMN     "post_status" "PostStatus" NOT NULL DEFAULT 'DRAFT';

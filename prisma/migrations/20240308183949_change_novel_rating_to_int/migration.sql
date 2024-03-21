/*
  Warnings:

  - You are about to alter the column `rating` on the `novels` table. The data in that column could be lost. The data in that column will be cast from `Decimal(1,1)` to `Integer`.
  - Made the column `rating` on table `novels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "novels" ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "rating" SET DEFAULT 0,
ALTER COLUMN "rating" SET DATA TYPE INTEGER;

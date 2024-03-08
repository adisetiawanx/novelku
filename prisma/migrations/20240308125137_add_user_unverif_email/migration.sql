/*
  Warnings:

  - A unique constraint covering the columns `[unverifiedEmail]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "unverifiedEmail" TEXT,
ADD COLUMN     "unverifiedEmailTimestamp" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "users_unverifiedEmail_key" ON "users"("unverifiedEmail");

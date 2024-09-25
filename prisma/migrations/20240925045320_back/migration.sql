/*
  Warnings:

  - You are about to drop the `NovelAuthor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NovelGenre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NovelTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "NovelAuthor" DROP CONSTRAINT "NovelAuthor_author_id_fkey";

-- DropForeignKey
ALTER TABLE "NovelAuthor" DROP CONSTRAINT "NovelAuthor_novel_id_fkey";

-- DropForeignKey
ALTER TABLE "NovelGenre" DROP CONSTRAINT "NovelGenre_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "NovelGenre" DROP CONSTRAINT "NovelGenre_novel_id_fkey";

-- DropForeignKey
ALTER TABLE "NovelTag" DROP CONSTRAINT "NovelTag_novel_id_fkey";

-- DropForeignKey
ALTER TABLE "NovelTag" DROP CONSTRAINT "NovelTag_tag_id_fkey";

-- DropTable
DROP TABLE "NovelAuthor";

-- DropTable
DROP TABLE "NovelGenre";

-- DropTable
DROP TABLE "NovelTag";

-- CreateTable
CREATE TABLE "_novel_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_novel_authors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_novel_genres" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_novel_tags_AB_unique" ON "_novel_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_novel_tags_B_index" ON "_novel_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_novel_authors_AB_unique" ON "_novel_authors"("A", "B");

-- CreateIndex
CREATE INDEX "_novel_authors_B_index" ON "_novel_authors"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_novel_genres_AB_unique" ON "_novel_genres"("A", "B");

-- CreateIndex
CREATE INDEX "_novel_genres_B_index" ON "_novel_genres"("B");

-- AddForeignKey
ALTER TABLE "_novel_tags" ADD CONSTRAINT "_novel_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_novel_tags" ADD CONSTRAINT "_novel_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_novel_authors" ADD CONSTRAINT "_novel_authors_A_fkey" FOREIGN KEY ("A") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_novel_authors" ADD CONSTRAINT "_novel_authors_B_fkey" FOREIGN KEY ("B") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_novel_genres" ADD CONSTRAINT "_novel_genres_A_fkey" FOREIGN KEY ("A") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_novel_genres" ADD CONSTRAINT "_novel_genres_B_fkey" FOREIGN KEY ("B") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

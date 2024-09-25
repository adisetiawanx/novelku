/*
  Warnings:

  - You are about to drop the `_novel_authors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_novel_genres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_novel_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_novel_authors" DROP CONSTRAINT "_novel_authors_A_fkey";

-- DropForeignKey
ALTER TABLE "_novel_authors" DROP CONSTRAINT "_novel_authors_B_fkey";

-- DropForeignKey
ALTER TABLE "_novel_genres" DROP CONSTRAINT "_novel_genres_A_fkey";

-- DropForeignKey
ALTER TABLE "_novel_genres" DROP CONSTRAINT "_novel_genres_B_fkey";

-- DropForeignKey
ALTER TABLE "_novel_tags" DROP CONSTRAINT "_novel_tags_A_fkey";

-- DropForeignKey
ALTER TABLE "_novel_tags" DROP CONSTRAINT "_novel_tags_B_fkey";

-- DropTable
DROP TABLE "_novel_authors";

-- DropTable
DROP TABLE "_novel_genres";

-- DropTable
DROP TABLE "_novel_tags";

-- CreateTable
CREATE TABLE "NovelGenre" (
    "novel_id" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,

    CONSTRAINT "NovelGenre_pkey" PRIMARY KEY ("novel_id","genre_id")
);

-- CreateTable
CREATE TABLE "NovelAuthor" (
    "novel_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "NovelAuthor_pkey" PRIMARY KEY ("novel_id","author_id")
);

-- CreateTable
CREATE TABLE "NovelTag" (
    "novel_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "NovelTag_pkey" PRIMARY KEY ("novel_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "NovelGenre" ADD CONSTRAINT "NovelGenre_novel_id_fkey" FOREIGN KEY ("novel_id") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NovelGenre" ADD CONSTRAINT "NovelGenre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NovelAuthor" ADD CONSTRAINT "NovelAuthor_novel_id_fkey" FOREIGN KEY ("novel_id") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NovelAuthor" ADD CONSTRAINT "NovelAuthor_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NovelTag" ADD CONSTRAINT "NovelTag_novel_id_fkey" FOREIGN KEY ("novel_id") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NovelTag" ADD CONSTRAINT "NovelTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import prisma from "~/configs/db";

export const createChapter = async (chapter: {
  title: string;
  number: number;
  text: string;
  novelId: string;
  userId: string;
}) => {
  return await prisma.chapter.create({
    data: {
      title: chapter.title,
      number: chapter.number,
      text: chapter.text,
      novelId: chapter.novelId,
      userId: chapter.userId,
    },
  });
};

export const createChapterBulk = async (
  chapters: {
    title: string;
    number: number;
    text: string;
    novelId: string;
    userId: string;
  }[]
) => {
  return await prisma.chapter.createMany({
    data: chapters,
  });
};

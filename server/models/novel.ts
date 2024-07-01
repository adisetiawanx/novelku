import prisma from "~/configs/db";
import { createNovelData } from "../types/novel";

export const createNovel = async (novel: createNovelData) => {
  return prisma.novel.create({
    data: {
      userId: novel.user_id,
      title: novel.title,
      postStatus: novel.post_status,
      slug: novel.slug,
      synopsis: novel.synopsis,
      rating: novel.rating,
      alternativeTitle: novel.alternative_title,
      type: novel.type,
      status: novel.status,
      year: novel.year,
      imageUrl: novel.image_url,
      totalView: 0,
      genres: {
        connectOrCreate: novel.genres.map((genre) => ({
          create: { name: genre.name.toLowerCase() },
          where: { name: genre.name },
        })),
      },
      authors: {
        connectOrCreate: novel.authors.map((author) => ({
          create: { name: author.name },
          where: { name: author.name },
        })),
      },
      tags: {
        connectOrCreate: novel.tags.map((tag) => ({
          create: { name: tag.name },
          where: { name: tag.name },
        })),
      },
    },
    select: {
      id: true,
      slug: true,
    },
  });
};

export const getNovelSlugBySlug = async (slug: string) => {
  return prisma.novel.findUnique({
    where: {
      slug,
    },
    select: {
      slug: true,
    },
  });
};

export const getNovels = async (
  take: number | undefined,
  skip: number | undefined,
  search?: string | undefined
) => {
  let where = {};
  if (search) {
    where = {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };
  }
  const novels = await prisma.novel.findMany({
    take,
    skip,
    where,
    include: {
      authors: {
        select: {
          name: true,
        },
      },
      genres: {
        select: {
          name: true,
        },
      },
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
  const totalNovel = await prisma.novel.count({
    where,
  });

  return {
    novels,
    totalNovel,
  };
};

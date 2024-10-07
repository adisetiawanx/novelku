import prisma from "~/configs/db";

export const getGenres = async (
  take: number | undefined,
  skip: number | undefined,
  search?: string | undefined
) => {
  let where = {};
  if (search) {
    where = {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };
  }
  const genres = await prisma.genre.findMany({
    take,
    skip,
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  const totalGenre = await prisma.genre.count({
    where,
  });

  return {
    genres,
    totalGenre,
  };
};

export const createGenre = async (name: string) => {
  return await prisma.genre.create({
    data: {
      name,
    },
  });
};

export const updateGenre = async (id: string, name: string) => {
  return await prisma.genre.update({
    where: { id },
    data: {
      name,
    },
  });
};

export const getGenreById = async (id: string) => {
  return await prisma.genre.findUnique({
    where: { id },
    include: {
      novels: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });
};

export const deleteGenre = async (id: string) => {
  return await prisma.genre.delete({
    where: { id },
  });
};

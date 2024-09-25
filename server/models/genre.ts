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

import prisma from "~/configs/db";

export const getAuthors = async (
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
  const authors = await prisma.author.findMany({
    take,
    skip,
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  const totalAuthor = await prisma.author.count({
    where,
  });

  return {
    authors,
    totalAuthor,
  };
};

export const createAuthor = async (name: string) => {
  return await prisma.author.create({
    data: {
      name,
    },
  });
};

export const updateAuthor = async (id: string, name: string) => {
  return await prisma.author.update({
    where: { id },
    data: {
      name,
    },
  });
};

export const getAuthorById = async (id: string) => {
  return await prisma.author.findUnique({
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

export const deleteAuthor = async (id: string) => {
  return await prisma.author.delete({
    where: { id },
  });
};

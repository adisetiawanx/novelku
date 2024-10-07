import prisma from "~/configs/db";

export const getTags = async (
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
  const tags = await prisma.tag.findMany({
    take,
    skip,
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
  const totalTag = await prisma.tag.count({
    where,
  });

  return {
    tags,
    totalTag,
  };
};

export const createTag = async (name: string) => {
  return await prisma.tag.create({
    data: {
      name,
    },
  });
};

export const updateTag = async (id: string, name: string) => {
  return await prisma.tag.update({
    where: { id },
    data: {
      name,
    },
  });
};

export const getTagById = async (id: string) => {
  return await prisma.tag.findUnique({
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

export const deleteTag = async (id: string) => {
  return await prisma.tag.delete({
    where: { id },
  });
};

import prisma from "~/configs/db";

export const getNovels = async (
  take: number | undefined,
  skip: number | undefined,
  search?: string | undefined,
  status?: string | null
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
  if (status) {
    where = {
      ...where,
      status: {
        equals: status,
      },
    };
  }
  where = {
    ...where,
    postStatus: {
      equals: "PUBLISHED",
    },
  };
  const novels = await prisma.novel.findMany({
    take,
    skip,
    where,
    select: {
      title: true,
      slug: true,
      status: true,
      type: true,
      rating: true,
      imageUrl: true,
      chapters: {
        take: 1,
        select: {
          title: true,
        },
        orderBy: {
          number: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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

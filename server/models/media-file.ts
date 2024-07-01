import prisma from "~/configs/db";

export const addMediaFile = async (mediaFile: {
  name: string;
  url: string;
  type: "IMAGE" | "VIDEO" | "AUDIO";
}) => {
  return await prisma.mediaFile.create({
    data: {
      name: mediaFile.name,
      url: mediaFile.url,
      type: mediaFile.type,
    },
  });
};

export const deleteMediaFile = async (id: string) => {
  return await prisma.mediaFile.delete({
    where: {
      id,
    },
  });
};

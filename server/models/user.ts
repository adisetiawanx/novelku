import prisma from "~/configs/db";
import { CreateUserData } from "../types/user";

export const createUser = async (userData: CreateUserData) => {
  await prisma.user.create({
    data: {
      email: userData.email,
      name: userData.name,
      emailVerified: new Date(),
      accounts: {
        create: {
          compoundId: userData.compoundId,
          providerId: userData.providerId,
          providerAccountId: userData.providerAccountId,
        },
      },
    },
  });
};

export const getUserPasswordByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
    },
  });
};

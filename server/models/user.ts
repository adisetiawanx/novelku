import prisma from "~/configs/db";
import { CreateUserData } from "../types/user";

export const createUser = async (userData: CreateUserData) => {
  return await prisma.user.create({
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
    select: {
      id: true,
    },
  });
};

export const getUserPasswordByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      password: true,
      role: true,
      profileImageUrl: true,
    },
  });
};

export const setUserPassword = async (email: string, password: string) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      password,
    },
    select: {
      email: true,
    },
  });
};

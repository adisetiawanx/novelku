export type CreateUserData = {
  compoundId: string;
  providerId: string;
  providerAccountId: string;
  name: string;
  email: string;
};

export type UserInToken = {
  id: string;
  name?: string;
  email: string;
  role: "USER" | "ADMIN" | string;
  profileImageUrl?: string;
};

import { UserInToken } from "../types/user";
import jsonwebtoken from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const createAccessToken = (user: UserInToken) => {
  return jsonwebtoken.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

export const createRefreshToken = (user: UserInToken) => {
  return jsonwebtoken.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jsonwebtoken.verify(token, ACCESS_TOKEN_SECRET) as UserInToken;
};

export const verifyRefreshToken = (token: string) => {
  return jsonwebtoken.verify(token, REFRESH_TOKEN_SECRET) as UserInToken;
};

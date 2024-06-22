import { H3Event } from "h3";

export const isAdmin = async (event: H3Event) => {
  const accessToken = event.node.req.headers.authorization?.split(" ")[1] || "";
  const user = verifyAccessToken(accessToken);
  if (user.role !== "ADMIN") {
    throw new ErrorWithCode(401, "Unauthorized access. Admin only.");
  }
  return user;
};

export const isUserAuthorize = async (event: H3Event) => {
  const accessToken = event.node.req.headers.authorization?.split(" ")[1] || "";
  const user = verifyAccessToken(accessToken);

  return user;
};

import { createUser, getUserPasswordByEmail } from "~/server/models/user";
import { createAccessToken, createRefreshToken } from "~/server/utils/tokens";

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig(event);

    const googleClient = await setupGoogleClient(event);
    const params = googleClient.callbackParams(event.node.req);
    const tokenSet = await googleClient.callback(
      runtimeConfig.googleRedirectUri,
      params
    );

    const callbackUrl = getCookie(event, "callback_url") || "/";

    const userFromGoogle = await googleClient.userinfo(tokenSet);

    //@ts-expect-error google user should have email
    const userEmail = userFromGoogle.email.toLowerCase();
    const userFromDB = await getUserPasswordByEmail(userEmail);

    if (!userFromDB) {
      //create new user whatever is login or register if not exist then user need to set password
      const providerId = "google";
      const providerAccountId = userFromGoogle.sub;
      const compoundId = `${providerId}-${providerAccountId}`;
      const newUserFromDB = await createUser({
        //@ts-expect-error google user should have email
        email: userFromGoogle.email?.toLowerCase(),
        //@ts-expect-error google user should have name
        name: userFromGoogle.name,
        providerId,
        providerAccountId,
        compoundId,
      });

      const newUserToToken = {
        id: newUserFromDB.id,
        name: userFromGoogle.name,
        email: userFromGoogle.email!.toLowerCase(),
        role: "USER",
        profileImageUrl: "",
      };

      setCookie(event, "access_token", createAccessToken(newUserToToken));
      setCookie(event, "refresh_token", createRefreshToken(newUserToToken));

      return sendRedirect(event, "/auth/set-password");
    }

    const userToToken = {
      id: userFromDB?.id,
      name: userFromDB?.name,
      email: userFromGoogle.email!.toLowerCase(),
      role: userFromDB?.role,
      profileImageUrl: userFromDB?.profileImageUrl,
    };

    //@ts-expect-error user/user id must be found if it's not found then it's already created a new user ^
    setCookie(event, "access_token", createAccessToken(userToToken));
    //@ts-expect-error user/user id must be found if it's not found then it's already created a new user ^
    setCookie(event, "refresh_token", createRefreshToken(userToToken));

    if (!userFromDB?.password) {
      //set password if user does not have password
      return sendRedirect(event, "/auth/set-password");
    }

    return sendRedirect(event, callbackUrl);
  } catch (error) {
    if (error instanceof ErrorWithCode) {
      return sendError(
        event,
        createError({
          statusCode: error.statusCode,
          statusMessage: error.message,
        })
      );
    } else {
      console.error(error);
      return sendError(
        event,
        createError({
          statusCode: 500,
          statusMessage: "Internal Server Error",
        })
      );
    }
  }
});

import { createUser, getUserPasswordByEmail } from "~/server/models/user";

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
      await createUser({
        //@ts-expect-error google user should have email
        email: userFromGoogle.email?.toLowerCase(),
        //@ts-expect-error google user should have name
        name: userFromGoogle.name,
        providerId,
        providerAccountId,
        compoundId,
      });

      //@ts-expect-error google user should have access token
      setCookie(event, "access_token", {
        name: userFromGoogle.name,
        email: userFromGoogle.email!.toLowerCase(),
        role: "USER",
        profileImageUrl: "",
      });
      //@ts-expect-error google user should have access token
      setCookie(event, "refresh_token", {
        name: userFromGoogle.name,
        email: userFromGoogle.email!.toLowerCase(),
        role: "USER",
        profileImageUrl: "",
      });
      return sendRedirect(event, "/auth/set-password");
    }

    if (!userFromDB?.password) {
      //set password if user does not have password

      //@ts-expect-error google user should have access token
      setCookie(event, "access_token", {
        name: userFromGoogle.name,
        email: userFromGoogle.email!.toLowerCase(),
        role: "USER",
        profileImageUrl: "",
      });
      //@ts-expect-error google user should have access token
      setCookie(event, "refresh_token", {
        name: userFromGoogle.name,
        email: userFromGoogle.email!.toLowerCase(),
        role: "USER",
        profileImageUrl: "",
      });

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
    }
  }
});

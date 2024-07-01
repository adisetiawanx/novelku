export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const provider = body.provider;

    if (!provider) {
      throw new ErrorWithCode(400, "Provider is required");
    }

    switch (provider) {
      case "google":
        const googleClient = await setupGoogleClient(event);
        const authorizationUrl = googleClient.authorizationUrl({
          scope: "openid email profile",
        });

        return {
          callbackUrl: authorizationUrl,
        };
      case "local":

      default:
        throw new ErrorWithCode(400, "Provider is not supported");
    }
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

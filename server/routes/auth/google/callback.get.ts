export default defineEventHandler(async (event) => {
  try {
    const googleClient = await setupGoogleClient(event);
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

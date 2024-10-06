import { deleteAuthor } from "~/server/models/author";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const params = getRouterParams(event);

    const author = await deleteAuthor(params.authorId);

    return {
      msg: "Author deleted successfully",
      data: {
        author: {
          id: author.id,
        },
      },
    };
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

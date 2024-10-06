import { deleteGenre } from "~/server/models/genre";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const params = getRouterParams(event);

    const genre = await deleteGenre(params.genreId);

    return {
      msg: "Genre deleted successfully",
      data: {
        genre: {
          id: genre.id,
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
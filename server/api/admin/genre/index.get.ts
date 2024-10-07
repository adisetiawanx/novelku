import { getGenres } from "~/server/models/admin/genre";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const query = getQuery(event);
    const { take, skip, search } = query;

    const genresData = await getGenres(
      Number(take) || undefined,
      Number(skip) || undefined,
      String(search) || undefined
    );

    return {
      msg: "Genre fetched successfully",
      data: {
        genres: genresData.genres,
        totalGenre: genresData.totalGenre,
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

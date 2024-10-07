import { getGenreById } from "~/server/models/admin/genre";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const params = getRouterParams(event);

    const genreData = await getGenreById(params.genreId);

    return {
      msg: "Genre fetched successfully",
      data: {
        genre: {
          id: genreData?.id,
          name: genreData?.name,
        },
        novels: genreData?.novels.map((novel) => {
          return {
            id: novel.id,
            title: novel.title,
            slug: novel.slug,
          };
        }),
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

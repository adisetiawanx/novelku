import { getAuthors } from "~/server/models/admin/author";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const query = getQuery(event);
    const { take, skip, search } = query;

    const authorsData = await getAuthors(
      Number(take) || undefined,
      Number(skip) || undefined,
      String(search) || undefined
    );

    return {
      msg: "Author fetched successfully",
      data: {
        authors: authorsData.authors,
        totalAuthor: authorsData.totalAuthor,
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

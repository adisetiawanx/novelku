import { getAuthorById } from "~/server/models/admin/author";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const params = getRouterParams(event);

    const authorData = await getAuthorById(params.authorId);

    return {
      msg: "Author fetched successfully",
      data: {
        author: {
          id: authorData?.id,
          name: authorData?.name,
        },
        novels: authorData?.novels.map((novel) => {
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

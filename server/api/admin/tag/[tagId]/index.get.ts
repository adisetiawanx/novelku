import { getTagById } from "~/server/models/tag";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const params = getRouterParams(event);

    const tagData = await getTagById(params.tagId);

    return {
      msg: "Tag fetched successfully",
      data: {
        tag: {
          id: tagData?.id,
          name: tagData?.name,
        },
        novels: tagData?.novels.map((novel) => {
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

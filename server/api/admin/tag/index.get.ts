import { getTags } from "~/server/models/tag";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const query = getQuery(event);
    const { take, skip, search } = query;

    const tagsData = await getTags(
      Number(take) || undefined,
      Number(skip) || undefined,
      String(search) || undefined
    );

    return {
      msg: "Tag fetched successfully",
      data: {
        tags: tagsData.tags,
        totalTag: tagsData.totalTag,
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

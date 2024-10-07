import { getNovelById } from "~/server/models/admin/novel";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const params = getRouterParams(event);

    const novelData = await getNovelById(String(params.novelId));

    if (!novelData) {
      throw new ErrorWithCode(404, "Novel not found");
    }

    return {
      msg: "Novel fetched successfully",
      data: {
        novel: novelData,
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

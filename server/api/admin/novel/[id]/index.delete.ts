import { deleteNovel } from "~/server/models/novel";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const params = getRouterParams(event);
    const novelId = params.id;

    if (!novelId) {
      throw new ErrorWithCode(400, "Missing required fields");
    }

    const novelData = await deleteNovel(novelId);

    return {
      msg: "Novel deleted successfully",
      data: {
        chapter: novelData,
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

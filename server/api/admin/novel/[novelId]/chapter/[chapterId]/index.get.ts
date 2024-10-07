import { getChapterById } from "~/server/models/admin/chapter";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const params = getRouterParams(event);
    const id = params.chapterId;

    const chapterData = await getChapterById(id);

    if (!chapterData) {
      throw new ErrorWithCode(404, "Chapter not found");
    }

    return {
      msg: "Chapter fetched successfully",
      data: {
        chapter: chapterData,
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

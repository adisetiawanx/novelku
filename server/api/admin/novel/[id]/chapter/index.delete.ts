import { deleteChapter } from "~/server/models/chapter";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const body = await readBody(event);
    let { chapterId } = body;

    if (!chapterId) {
      throw new ErrorWithCode(400, "Missing required fields");
    }

    const chapterData = await deleteChapter(chapterId);

    return {
      msg: "Chapter deleted successfully",
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

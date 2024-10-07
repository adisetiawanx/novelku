import { updateChapter } from "~/server/models/admin/chapter";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const params = getRouterParams(event);
    const id = params.chapterId;

    const body = await readBody(event);
    let { title, number, text } = body;

    if (!title || !number || !text) {
      throw new ErrorWithCode(400, "Missing required fields");
    }

    const chapterData = await updateChapter({
      id,
      title,
      number,
      text,
    });

    return {
      msg: "Chapter updated successfully",
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

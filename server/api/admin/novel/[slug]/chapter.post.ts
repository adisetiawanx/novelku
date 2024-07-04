import { createChapter } from "~/server/models/chapter";
import { getNovelBySlug } from "~/server/models/novel";

export default defineEventHandler(async (event) => {
  try {
    const userInToken = await isAdminAuthorize(event);

    const params = getRouterParams(event);
    const body = await readBody(event);
    let { title, number, text } = body;

    if (!title || !number || !text) {
      throw new ErrorWithCode(400, "Missing required fields");
    }

    const novel = await getNovelBySlug(String(params.slug));

    if (!novel) {
      throw new ErrorWithCode(404, "Novel not found");
    }

    const chapterData = await createChapter({
      title,
      number,
      text,
      novelId: novel.id,
      userId: userInToken.id,
    });

    return {
      msg: "Chapter created successfully",
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

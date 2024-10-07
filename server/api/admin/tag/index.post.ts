import { createTag } from "~/server/models/tag";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const body = await readBody(event);
    let { name } = body;

    if (!name) {
      throw new ErrorWithCode(400, "Missing required fields");
    }

    const tag = await createTag(name);

    return {
      msg: "Tag created successfully",
      data: {
        tag: {
          id: tag.id,
        },
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

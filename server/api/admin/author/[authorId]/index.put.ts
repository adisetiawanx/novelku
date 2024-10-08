import { updateAuthor } from "~/server/models/admin/author";

export default defineEventHandler(async (event) => {
  try {
    await isAdminAuthorize(event);

    const params = getRouterParams(event);

    const body = await readBody(event);
    let { name } = body;

    if (!name) {
      throw new ErrorWithCode(400, "Missing required fields");
    }

    const author = await updateAuthor(params.authorId, name);

    return {
      msg: "Author updated successfully",
      data: {
        auhtor: {
          id: author.id,
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

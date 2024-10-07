import { getNovels } from "~/server/models/novel";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { take, skip, search, status } = query;

    const novelsData = await getNovels(
      Number(take) || undefined,
      Number(skip) || undefined,
      String(search) || undefined,
      String(status) || undefined
    );

    return {
      msg: "Novel fetched successfully",
      data: {
        novels: novelsData.novels,
        totalNovel: novelsData.totalNovel,
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

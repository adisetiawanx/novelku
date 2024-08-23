import { getNovelSlugBySlug, updateNovelById } from "~/server/models/novel";
import { createNovelData } from "~/server/types/novel";

export default defineEventHandler(async (event) => {
  try {
    const userInToken = await isAdminAuthorize(event);

    const params = getRouterParams(event);

    const body = await readBody(event);
    let {
      post_status,
      title,
      alternative_title,
      slug,
      synopsis,
      rating,
      type,
      year,
      status,
      image_url,
      authors,
      genres,
      tags,
    } = body as createNovelData;

    if (
      !post_status ||
      !title ||
      !alternative_title ||
      !slug ||
      !synopsis ||
      !rating ||
      !type ||
      !year ||
      !status ||
      !image_url ||
      authors.length <= 0 ||
      genres.length <= 0 ||
      tags.length <= 0
    ) {
      throw new ErrorWithCode(400, "Missing required fields");
    }

    const isSlugExist = await getNovelSlugBySlug(slug);

    if (isSlugExist) {
      throw new ErrorWithCode(400, "Slug already exist");
    }

    const novel = await updateNovelById(params.id, {
      user_id: userInToken.id,
      post_status,
      title,
      alternative_title,
      slug,
      synopsis,
      rating,
      type,
      year,
      status,
      image_url,
      authors,
      genres,
      tags,
    });

    return {
      msg: "Novel updated successfully",
      data: {
        novel: {
          id: novel.id,
          slug: novel.slug,
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

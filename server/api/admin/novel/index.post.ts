import { createNovel, getNovelSlugBySlug } from "~/server/models/novel";
import { createNovelData } from "~/server/types/novel";
import { isAdmin } from "~/server/utils/is-admin-middleware";

export default defineEventHandler(async (event) => {
  try {
    const userInToken = await isAdmin(event);

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
      slug = slug + "-" + Math.random().toString(36).substring(2, 7);
    }

    const novel = await createNovel({
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
      msg: "Novel created successfully",
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

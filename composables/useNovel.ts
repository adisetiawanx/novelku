import type { NovelDataFromWEb } from "~/types/novel";

export default () => {
  const createNovel = async (novelData: NovelDataFromWEb) => {
    const { data: respone, error } = await useFetch("/api/admin/novel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + useCookie("access_token").value,
      },
      body: {
        post_status: novelData.post_status,
        title: novelData.title,
        alternative_title: novelData.alternative_title,
        slug: novelData.slug,
        synopsis: novelData.synopsis,
        rating: novelData.rating,
        type: novelData.type,
        year: novelData.year,
        status: novelData.status,
        image_url: novelData.image_url,
        authors: novelData.authors,
        genres: novelData.genres,
        tags: novelData.tags,
      },
    });

    if (error.value) {
      return {
        errorMessage: error.value.statusMessage,
        successMessage: null,
        data: null,
      };
    }

    if (respone.value) {
      return {
        errorMessage: null,
        successMessage: respone.value.msg,
        data: respone.value.data,
      };
    }
  };

  return {
    createNovel,
  };
};

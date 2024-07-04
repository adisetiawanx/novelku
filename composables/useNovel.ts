import type { NovelDataFromWeb } from "~/types/novel";

export default () => {
  const createNovel = async (novelData: NovelDataFromWeb) => {
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

  const getNovels = async ({
    take,
    skip,
    search,
  }: {
    take: number;
    skip: number;
    search: string;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/admin/novel?take=${take}&skip=${skip}&search=${search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useCookie("access_token").value,
        },
      }
    );

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

  const uploadNovelCover = async (file: any | null) => {
    const formData = new FormData();

    formData.append("file", file);

    const { data: respone, error } = await useFetch("/api/media/image", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + useCookie("access_token").value,
      },
      body: formData,
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

  const getNovelBySlug = async (slug: string) => {
    const { data: respone, error } = await useFetch(
      `/api/admin/novel/${slug}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useCookie("access_token").value,
        },
      }
    );

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
    getNovels,
    uploadNovelCover,
    getNovelBySlug,
  };
};

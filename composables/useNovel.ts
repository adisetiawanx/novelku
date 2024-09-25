import type { NovelDataFromWeb } from "~/types/novel";

export default () => {
  const createNovel = async (novelData: NovelDataFromWeb) => {
    try {
      const respone = await $fetch("/api/admin/novel", {
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

      return {
        errorMessage: null,
        successMessage: respone.msg,
        data: respone.data,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          errorMessage: error.message,
          successMessage: null,
          data: null,
        };
      }
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
    try {
      const respone = await $fetch(
        `/api/admin/novel?take=${take}&skip=${skip}&search=${search}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + useCookie("access_token").value,
          },
        }
      );

      return {
        errorMessage: null,
        successMessage: respone.msg,
        data: respone.data,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          errorMessage: error.message,
          successMessage: null,
          data: null,
        };
      }
    }
  };

  const uploadNovelCover = async (file: any | null) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const respone = await $fetch("/api/media/image", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + useCookie("access_token").value,
        },
        body: formData,
      });

      return {
        errorMessage: null,
        successMessage: respone.msg,
        data: respone.data,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          errorMessage: error.message,
          successMessage: null,
          data: null,
        };
      }
    }
  };

  const getNovel = async (id: string) => {
    try {
      const respone = await $fetch(`/api/admin/novel/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useCookie("access_token").value,
        },
      });

      return {
        errorMessage: null,
        successMessage: respone.msg,
        data: respone.data,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          errorMessage: error.message,
          successMessage: null,
          data: null,
        };
      }
    }
  };

  const updateNovel = async (
    novelOldSlug: string,
    novelData: NovelDataFromWeb
  ) => {
    try {
      const respone = await $fetch(`/api/admin/novel/${novelOldSlug}`, {
        method: "PUT",
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

      return {
        errorMessage: null,
        successMessage: respone.msg,
        data: respone.data,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          errorMessage: error.message,
          successMessage: null,
          data: null,
        };
      }
    }
  };

  const deleteNovel = async (id: string) => {
    try {
      const respone = await $fetch(`/api/admin/novel/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useCookie("access_token").value,
        },
      });

      return {
        errorMessage: null,
        successMessage: respone.msg,
        data: respone.data,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          errorMessage: error.message,
          successMessage: null,
          data: null,
        };
      }
    }
  };

  return {
    createNovel,
    getNovels,
    uploadNovelCover,
    getNovel,
    updateNovel,
    deleteNovel,
  };
};

export default () => {
  const createChapter = async (
    novelId: string,
    chapterData: {
      title: string;
      number: number;
      text: string;
    }
  ) => {
    try {
      const respone = await $fetch<{ msg: string; data: any }>(
        `/api/admin/novel/${novelId}/chapter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + useCookie("access_token").value,
          },
          body: {
            title: chapterData.title,
            number: chapterData.number,
            text: chapterData.text,
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

  const createChapterBulk = async (novelBulk: any, novelId: string) => {
    try {
      const formData = new FormData();
      formData.append("file", novelBulk);

      const respone = await $fetch<{ msg: string; data: any }>(
        `/api/admin/novel/${novelId}/chapter/bulk`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + useCookie("access_token").value,
          },
          body: formData,
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

  const deleteChapter = async (chapterId: string, novelId: string) => {
    try {
      const respone = await $fetch(
        `/api/admin/novel/${novelId}/chapter/${chapterId}`,
        {
          method: "DELETE",
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

  const updateChapter = async ({
    chapterId,
    novelId,
    title,
    number,
    text,
  }: {
    chapterId: string;
    novelId: string;
    title: string;
    number: number;
    text: string;
  }) => {
    try {
      const respone = await $fetch(
        `/api/admin/novel/${novelId}/chapter/${chapterId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + useCookie("access_token").value,
          },
          body: {
            title,
            number,
            text,
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

  const getChapterById = async (chapterId: string, novelId: string) => {
    try {
      const respone = await $fetch(
        `/api/admin/novel/${novelId}/chapter/${chapterId}`,
        {
          method: "GET",
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

  return {
    createChapter,
    createChapterBulk,
    deleteChapter,
    updateChapter,
    getChapterById,
  };
};

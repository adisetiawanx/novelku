export default () => {
  const createChapter = async (
    novelId: string,
    chapterData: {
      title: string;
      number: number;
      text: string;
    }
  ) => {
    const { data: respone, error } = await useFetch(
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

  const createChapterBulk = async (novelBulk: any, novelId: string) => {
    const formData = new FormData();
    formData.append("file", novelBulk);

    const { data: respone, error } = await useFetch(
      `/api/admin/novel/${novelId}/chapter-bulk`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + useCookie("access_token").value,
        },
        body: formData,
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

  const deleteChapter = async (chapterId: string, novelId: string) => {
    const { data: respone, error } = await useFetch(
      `/api/admin/novel/${novelId}/chapter`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useCookie("access_token").value,
        },
        body: {
          chapterId,
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
    createChapter,
    createChapterBulk,
    deleteChapter,
  };
};

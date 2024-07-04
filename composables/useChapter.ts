export default () => {
  const createChapter = async (
    novelSlug: string,
    chapterData: {
      title: string;
      number: number;
      text: string;
    }
  ) => {
    const { data: respone, error } = await useFetch(
      `/api/admin/novel/${novelSlug}/chapter`,
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
  return {
    createChapter,
  };
};

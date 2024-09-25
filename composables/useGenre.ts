export default () => {
  const getGenres = async ({
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
        `/api/admin/genre?take=${take}&skip=${skip}&search=${search}`,
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
    getGenres,
  };
};

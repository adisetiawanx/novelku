export default () => {
  const getNovels = async ({
    take,
    skip,
    search,
    status,
  }: {
    take: number;
    skip: number;
    search: string;
    status: string;
  }) => {
    try {
      const respone = await $fetch(
        `/api/novel?take=${take}&skip=${skip}&search=${search}&status=${status}`,
        {
          headers: {
            "Content-Type": "application/json",
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
    getNovels,
  };
};

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

  const createGenre = async ({ name }: { name: string }) => {
    try {
      const respone = await $fetch("/api/admin/genre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useCookie("access_token").value,
        },
        body: { name },
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

  const updateGenre = async ({ id, name }: { id: string; name: string }) => {
    try {
      const respone = await $fetch(`/api/admin/genre/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useCookie("access_token").value,
        },
        body: { name },
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

  const getGenreById = async (id: string) => {
    try {
      const respone = await $fetch(`/api/admin/genre/${id}`, {
        method: "GET",
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

  const deleteGenre = async (id: string) => {
    try {
      const respone = await $fetch(`/api/admin/genre/${id}`, {
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
    getGenres,
    createGenre,
    updateGenre,
    getGenreById,
    deleteGenre,
  };
};

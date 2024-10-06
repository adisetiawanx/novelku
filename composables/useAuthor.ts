export default () => {
  const getAuthors = async ({
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
        `/api/admin/author?take=${take}&skip=${skip}&search=${search}`,
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

  const createAuhtor = async ({ name }: { name: string }) => {
    try {
      const respone = await $fetch("/api/admin/author", {
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

  const updateAuthor = async ({ id, name }: { id: string; name: string }) => {
    try {
      const respone = await $fetch(`/api/admin/author/${id}`, {
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

  const getAuthorById = async (id: string) => {
    try {
      const respone = await $fetch(`/api/admin/author/${id}`, {
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

  const deleteAuthor = async (id: string) => {
    try {
      const respone = await $fetch(`/api/admin/author/${id}`, {
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
    getAuthors,
    createAuhtor,
    updateAuthor,
    getAuthorById,
    deleteAuthor,
  };
};

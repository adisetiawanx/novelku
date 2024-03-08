export default () => {
  const login = async () => {
    useCookie("callback_url").value = window.location.href;

    const { data, error } = await useFetch("/api/auth/login", {
      method: "POST",
      body: {
        provider: "google",
      },
    });
    if (error.value) {
      console.error(error);
      return;
    }

    if (data.value) {
      return navigateTo(data.value.callbackUrl, {
        external: true,
      });
    }
  };

  return {
    login,
  };
};

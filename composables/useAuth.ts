export default () => {
  const login = async () => {
    useCookie("callback_url").value = window.location.href;

    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: {
          provider: "google",
        },
      });

      return navigateTo(response.callbackUrl, {
        external: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        return;
      }
    }
  };

  return {
    login,
  };
};

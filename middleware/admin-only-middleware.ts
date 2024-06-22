import getUserFromToken from "~/utils/user-in-cookie";

export default defineNuxtRouteMiddleware(() => {
  const user = getUserFromToken();
  if (user && user.role === "ADMIN") {
    return true;
  } else {
    return navigateTo("/");
  }
});

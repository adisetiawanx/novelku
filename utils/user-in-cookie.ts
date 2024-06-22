export default function getUserFromToken() {
  const access_token = useCookie("access_token");

  if (!access_token.value) {
    return null;
  }

  const user = parseJwt(access_token.value);

  return {
    email: user.email as string,
    name: user.name as string,
    role: user.role as string,
    profileImageUrl: (user.profileImageUrl as string) || "",
  };
}

const parseJwt = (token: string | any) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

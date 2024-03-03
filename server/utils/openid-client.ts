import { Issuer } from "openid-client";
import { H3Event } from "h3";

export const setupGoogleClient = async (event: H3Event) => {
  const runtimeConfig = useRuntimeConfig(event);

  const googleClientId = runtimeConfig.googleClientId as string;
  const googleClientSecret = runtimeConfig.googleClientSecret as string;
  const googleRedirectUri = runtimeConfig.googleRedirectUri as string;

  const googleIssuer = await Issuer.discover("https://accounts.google.com");
  const googleClient = new googleIssuer.Client({
    client_id: googleClientId,
    client_secret: googleClientSecret,
    redirect_uris: [googleRedirectUri],
    response_types: ["code"],
  });

  return googleClient;
};

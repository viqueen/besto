import { RequestHandler } from "express";

import { claimTokenHandler } from "./claim-token-handler";
import { googleAuthStrategy } from "./google-auth-strategy";
import { AuthenticationEndpointProps } from "./types";

const signOutHandler = (): RequestHandler => (request, response) => {
  request.logOut(() => {
    response.sendStatus(200);
  });
};

const authenticationEndpoint = async ({
  app,
  services,
  product,
  secrets,
}: AuthenticationEndpointProps) => {
  await googleAuthStrategy({ app, services, secrets, product });
  app.post(`/authz/_claim/token`, claimTokenHandler());
  app.get(`/authz/_sign-out`, signOutHandler());
};

export { authenticationEndpoint };

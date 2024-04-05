import { RequestHandler } from "express";

import { claimTokenHandler } from "./claim-token-handler";
import { githubAuthStrategy } from "./github-auth-strategy";
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
}: AuthenticationEndpointProps) => {
  await githubAuthStrategy({ app, services, product });
  await googleAuthStrategy({ app, services, product });
  app.post(`/authz/_claim/token`, claimTokenHandler());
  app.get(`/authz/_sign-out`, signOutHandler());
};

export { authenticationEndpoint };

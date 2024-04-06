import { RequestHandler } from "express";

import { AuthZEndpointProps } from "../types";

import { claimTokenHandler } from "./claim-token-handler";
import { githubAuthStrategy } from "./github-auth-strategy";
import { googleAuthStrategy } from "./google-auth-strategy";

const signOutHandler = (): RequestHandler => (request, response) => {
  request.logOut(() => {
    response.sendStatus(200);
  });
};

const signInEndpoint = async ({
  app,
  services,
  product,
}: AuthZEndpointProps) => {
  await githubAuthStrategy({ app, services, product });
  await googleAuthStrategy({ app, services, product });
  app.post(`/authz/_claim/token`, claimTokenHandler());
  app.get(`/authz/_sign-out`, signOutHandler());
};

export { signInEndpoint };

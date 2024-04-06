import { AuthZEndpointProps } from "../types";

import { githubAuthStrategy } from "./github-auth-strategy";

const signUpEndpoint = async ({
  app,
  services,
  product,
}: AuthZEndpointProps) => {
  await githubAuthStrategy({ app, services, product });
};

export { signUpEndpoint };

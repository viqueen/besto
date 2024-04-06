import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

import { AuthZEndpointProps } from "../types";

type VerifyCallback = (
  err?: string | Error | null,
  user?: Express.User,
  info?: unknown,
) => void;

type Profile = passport.Profile & {
  id: string;
};

const githubAuthStrategy = async ({
  app,
  product,
  services,
}: AuthZEndpointProps) => {
  const { clientID, clientSecret } = await services.secret.github();

  const github = new GitHubStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: `${product.gatewayUrl}/authz/sign-in/_github/callback`,
    },
    (
      _token: string,
      _refresh: string,
      _profile: Profile,
      _done: VerifyCallback,
    ) => {},
  );

  app.get(
    `/authz/sign-in/_github`,
    passport.authenticate(github, {
      failureRedirect: product.baseUrl,
      keepSessionInfo: true,
    }),
  );

  app.get(
    `/authz/sign-in/_github/callback`,
    passport.authenticate(github, {
      failureRedirect: product.baseUrl,
      keepSessionInfo: true,
    }),
    (request, response) => {
      if (request.session.claimToken) {
        response.redirect(
          `${product.baseUrl}/#/sign-in?token=${request.session.claimToken}`,
        );
      } else {
        response.redirect(`${product.baseUrl}/`);
      }
    },
  );
};

export { githubAuthStrategy };

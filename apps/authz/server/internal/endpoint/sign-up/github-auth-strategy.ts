import { IdentityProfile, IdentityProvider } from "@besto/api-node-sdk";
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
      callbackURL: `${product.gatewayUrl}/authz/sign-up/_github/callback`,
    },
    (
      token: string,
      refresh: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      services.identity
        .signUp(
          new IdentityProfile({
            provider: IdentityProvider.GITHUB,
            profile_id: profile.id,
            profile_email: profile.emails?.[0].value,
          }),
        )
        .then((response) => {
          done(null, { identity: response });
        })
        .catch((error) => {
          done(error);
        });
    },
  );

  app.get(
    `/authz/sign-up/_github`,
    passport.authenticate(github, {
      failureRedirect: product.baseUrl,
      keepSessionInfo: true,
    }),
  );

  app.get(
    `/authz/sign-up/_github/callback`,
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

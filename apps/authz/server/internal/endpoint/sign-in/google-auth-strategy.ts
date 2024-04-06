import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { AuthZEndpointProps } from "../types";

const googleAuthStrategy = async ({
  app,
  product,
  services,
}: AuthZEndpointProps) => {
  const { clientID, clientSecret } = await services.secret.google();

  const google = new GoogleStrategy(
    {
      clientID,
      clientSecret,
      scope: ["profile"],
      callbackURL: `${product.gatewayUrl}/authz/sign-in/_google/callback`,
    },
    (_token, _refresh, _profile, _done) => {},
  );

  app.get(
    `/authz/sign-in/_google`,
    passport.authenticate(google, {
      failureRedirect: product.baseUrl,
      keepSessionInfo: true,
    }),
  );

  app.get(
    `/authz/sing-in/_google/callback`,
    passport.authenticate(google, {
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

export { googleAuthStrategy };

import { IdentityProvider } from "@besto/api-node-sdk";
import { Express, json, urlencoded } from "express";
import session, { SessionData } from "express-session";
import passport from "passport";
import { uid } from "uid/secure";

import { ISecretService } from "../../service";
import { IAuthSessionService } from "../../service/session-service";

import { AuthSessionStore } from "./auth-session-store";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // noinspection JSUnusedGlobalSymbols
    interface User {
      identity: {
        provider: IdentityProvider;
        profileId: string;
      };
    }
  }
}

passport.serializeUser<Express.User>((user, done) => {
  done(null, user);
});

passport.deserializeUser<Express.User>((user, done) => {
  done(null, user);
});

interface WithPassportAuth {
  app: Express;
  services: {
    authSession: IAuthSessionService<SessionData>;
    secret: ISecretService;
  };
}

const withPassportAuth = async ({ app, services }: WithPassportAuth) => {
  const store = new AuthSessionStore(services.authSession);
  const cookieSecret = await services.secret.cookie();
  app.use(
    json(),
    urlencoded({ extended: true }),
    session({
      genid: () => uid(32),
      name: `besto_platform`,
      secret: cookieSecret,
      store,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );
};

export { withPassportAuth };

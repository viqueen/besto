import { Identity } from "@besto/api-node-sdk";
import { Express, json, RequestHandler, urlencoded } from "express";
import session, { SessionData } from "express-session";
import passport from "passport";
import { uid } from "uid/secure";

import { ISecretService, IAuthSessionService } from "../../service";

import { AuthSessionStore } from "./auth-session-store";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // noinspection JSUnusedGlobalSymbols
    interface User {
      identity: Identity;
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
  target: string;
  app: Express;
  services: {
    authSession: IAuthSessionService<SessionData>;
    secret: ISecretService;
  };
  middlewares: RequestHandler[];
}

const withPassportAuth = async ({
  target,
  app,
  services,
  middlewares,
}: WithPassportAuth) => {
  const store = new AuthSessionStore(services.authSession);
  const cookieSecret = await services.secret.cookie();
  app.use(
    target,
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
    passport.initialize(),
    passport.session(),
    ...middlewares,
  );
};

export { withPassportAuth };

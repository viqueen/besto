import e from "express";
import { Store, SessionData, Session } from "express-session";
import { DateTime } from "luxon";
import { uid } from "uid/secure";

import { IAuthSessionService } from "../../service/session-service";

declare module "express-session" {
  interface SessionData {
    id: string;
    claimToken: string;
    authToken: string;
    expiresAt: Date;
  }
}

class AuthSessionStore extends Store {
  constructor(private readonly service: IAuthSessionService<SessionData>) {
    super();
  }

  createSession(
    request: e.Request,
    session: SessionData,
  ): Session & SessionData {
    const base = super.createSession(request, session);
    const authToken = base.authToken ?? undefined;
    const claimToken = base.claimToken ?? uid(32);
    const sessionWithTokens = { ...base, authToken, claimToken };
    return super.createSession(request, sessionWithTokens);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  destroy(sessionId: string, callback?: (err?: any) => void) {
    this.service
      .removeSession(sessionId)
      .then(() => callback?.())
      .catch((error) => callback?.(error));
  }

  get(
    sessionId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (err: any, session?: SessionData | null) => void,
  ) {
    this.service
      .getSession(sessionId)
      .then((data) => {
        callback(null, data?.payload ?? null);
      })
      .catch((error) => callback(error));
  }

  set(
    sessionId: string,
    session: SessionData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback?: (err?: any) => void,
  ) {
    const expiresAt =
      session.cookie.expires ?? DateTime.now().plus({ hour: 24 }).toJSDate();
    this.service
      .setSession(sessionId, expiresAt, session)
      .then(() => callback?.())
      .catch((error) => callback?.(error));
  }
}

export { AuthSessionStore };

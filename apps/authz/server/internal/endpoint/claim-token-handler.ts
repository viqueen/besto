import { RequestHandler } from "express";
import { uid } from "uid/secure";

declare module "express-session" {
  interface SessionData {
    id: string;
    claimToken: string;
    authToken: string;
    expiresAt: Date;
  }
}

const claimTokenHandler = (): RequestHandler => (request, response) => {
  const session = request.session;
  if (!session) {
    return response.sendStatus(401);
  }

  const isValidSession = request.isAuthenticated() && !!request.user;
  if (!isValidSession) {
    return response.sendStatus(401);
  }

  const currentClaim = session.claimToken;
  if (currentClaim === undefined) {
    return response.sendStatus(401);
  }

  // noinspection JSUnresolvedReference
  const providedClaim = request.body.claim;
  if (typeof providedClaim !== "string" || providedClaim.length === 0) {
    return response.sendStatus(401);
  }

  const isMatchingClaim = currentClaim === providedClaim;
  if (!isMatchingClaim) {
    return response.sendStatus(401);
  }

  session.authToken = uid(32);
  return response
    .set(`cache-control`, `no-store`)
    .setHeader(`x-besto-session-token`, session.authToken)
    .status(200)
    .end();
};

export { claimTokenHandler };

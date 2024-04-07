import { Express } from "express";
import { SessionData } from "express-session";

import {
  tokenRequiredMiddleware,
  userRequiredMiddleware,
  withPassportAuth,
} from "../../middleware";
import { IAuthSessionService, ISecretService } from "../../service";

interface ApiEndpointProps {
  app: Express;
  services: {
    authSession: IAuthSessionService<SessionData>;
    secret: ISecretService;
  };
}

const apiEndpoint = async ({ app, services }: ApiEndpointProps) => {
  app.post(
    "/api/*",
    userRequiredMiddleware,
    tokenRequiredMiddleware,
    (_request, response) => {
      response.sendStatus(200);
    },
  );
};

export { apiEndpoint };

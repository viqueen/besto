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
  await withPassportAuth({
    target: "/api/*",
    app,
    services,
    middlewares: [
      userRequiredMiddleware,
      tokenRequiredMiddleware,
      (_request, response, _next) => {
        response.sendStatus(200);
      },
    ],
  });
};

export { apiEndpoint };

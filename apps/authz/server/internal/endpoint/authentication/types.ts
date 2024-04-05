import { Express } from "express";
import { SessionData } from "express-session";

import { ISecretService, IAuthSessionService } from "../../service";

interface AuthenticationEndpointProps {
  app: Express;
  services: {
    authSession: IAuthSessionService<SessionData>;
    secret: ISecretService;
  };
  product: {
    gatewayUrl: string;
    baseUrl: string;
  };
}

export type { AuthenticationEndpointProps };

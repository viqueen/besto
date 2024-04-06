import { Express } from "express";
import { SessionData } from "express-session";

import {
  IAuthSessionService,
  IIdentityService,
  ISecretService,
} from "../service";

interface AuthZEndpointProps {
  app: Express;
  services: {
    authSession: IAuthSessionService<SessionData>;
    identity: IIdentityService;
    secret: ISecretService;
  };
  product: {
    gatewayUrl: string;
    baseUrl: string;
  };
}

export type { AuthZEndpointProps };

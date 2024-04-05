import { Express } from "express";
import { SessionData } from "express-session";

import { IAuthSessionService } from "../service/session-service";

interface AuthenticationEndpointProps {
  app: Express;
  services: {
    authSession: IAuthSessionService<SessionData>;
  };
  product: {
    gatewayUrl: string;
    baseUrl: string;
  };
  secrets: {
    google: {
      clientID: string;
      clientSecret: string;
    };
    github: {
      clientID: string;
      clientSecret: string;
    };
  };
}

export type { AuthenticationEndpointProps };

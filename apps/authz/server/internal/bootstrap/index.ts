import { DynamoDbClientConfig } from "@besto/lib-node-sdk";
import { SessionData } from "express-session";

import { authAccess, AuthDynamoDbClients } from "../data";
import {
  AuthSessionService,
  IAuthSessionService,
} from "../service/session-service";

interface AuthBootstrap {
  product: {
    baseUrl: string;
    gatewayUrl: string;
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
  services: {
    authSession: IAuthSessionService<SessionData>;
  };
}

const bootstrapAuth = async (
  options: DynamoDbClientConfig,
  forceUpgrade: boolean = false,
): Promise<AuthBootstrap> => {
  const clients = new AuthDynamoDbClients(options);
  await clients.upgrade({ force: forceUpgrade });
  const access = authAccess<SessionData>(clients);
  const product = {
    gatewayUrl: "http://localhost:4000",
    baseUrl: "http://localhost:4040",
  };
  const secrets = {
    google: {
      clientID: "google-client-id",
      clientSecret: "google-client-secret",
    },
    github: {
      clientID: "github-client-id",
      clientSecret: "github-client-secret",
    },
  };
  return {
    product,
    secrets,
    services: {
      authSession: new AuthSessionService(access),
    },
  };
};

export type { AuthBootstrap };
export { bootstrapAuth };

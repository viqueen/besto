import { DynamoDbClientConfig } from "@besto/lib-node-sdk";
import { SessionData } from "express-session";

import { authAccess, AuthDynamoDbClients } from "../data";
import {
  ISecretService,
  AuthSessionService,
  IAuthSessionService,
  DotEnvSecretService,
} from "../service";

interface AuthBootstrap {
  product: {
    baseUrl: string;
    gatewayUrl: string;
  };
  services: {
    authSession: IAuthSessionService<SessionData>;
    secret: ISecretService;
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
    baseUrl: "http://localhost:10000",
  };
  return {
    product,
    services: {
      authSession: new AuthSessionService(access),
      secret: new DotEnvSecretService(),
    },
  };
};

export type { AuthBootstrap };
export { bootstrapAuth };

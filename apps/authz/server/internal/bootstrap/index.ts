import { DynamoDbClientConfig } from "@besto/lib-node-sdk";
import { SessionData } from "express-session";

import { authAccess, AuthDynamoDbClients } from "../data";
import {
  AuthSessionService,
  IAuthSessionService,
} from "../service/session-service";

interface AuthBootstrap {
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
  return {
    services: {
      authSession: new AuthSessionService(access),
    },
  };
};

export type { AuthBootstrap };
export { bootstrapAuth };

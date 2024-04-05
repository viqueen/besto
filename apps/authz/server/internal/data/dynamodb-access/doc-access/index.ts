import { IAuthAccess } from "../../access";
import { AuthDynamoDbClients } from "../clients";

import { AuthSessionAccess } from "./auth-session-entity-access";

const authAccess = <TSessionPayload>(
  clients: AuthDynamoDbClients,
): IAuthAccess<TSessionPayload> => {
  return {
    authSession: new AuthSessionAccess<TSessionPayload>(clients),
  };
};

export { authAccess };

import {
  DocEntityAccess,
  DocEntityReadAccess,
  DocEntityWriteAccess,
} from "@besto/lib-node-sdk";

import { AuthSession } from "../../access";
import { IdentityDynamoDbClients } from "../clients";
import { tables } from "../tables";

class AuthSessionReadAccess<TSessionPayload> extends DocEntityReadAccess<
  AuthSession<TSessionPayload>
> {
  constructor(clients: IdentityDynamoDbClients) {
    super(clients.ddbDoc(), clients.ddbTransforms(), tables.authSession);
  }
}

class AuthSessionWriteAccess<TSessionPayload> extends DocEntityWriteAccess<
  AuthSession<TSessionPayload>
> {
  constructor(clients: IdentityDynamoDbClients) {
    super(clients.ddbDoc(), clients.ddbTransforms(), tables.authSession);
  }
}

class AuthSessionAccess<TSessionPayload> extends DocEntityAccess<
  AuthSession<TSessionPayload>
> {
  constructor(clients: IdentityDynamoDbClients) {
    super(
      new AuthSessionReadAccess(clients),
      new AuthSessionWriteAccess(clients),
    );
  }
}

export { AuthSessionAccess };

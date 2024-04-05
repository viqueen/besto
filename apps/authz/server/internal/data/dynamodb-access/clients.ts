import { DynamoDbClientConfig, DynamoDbClients } from "@besto/lib-node-sdk";

import migrations from "./migrations";

class IdentityDynamoDbClients extends DynamoDbClients {
  constructor(options: DynamoDbClientConfig) {
    super(migrations, options);
  }
}

export { IdentityDynamoDbClients };

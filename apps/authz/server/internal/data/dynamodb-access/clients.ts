import { DynamoDbClientConfig, DynamoDbClients } from "@besto/lib-node-sdk";

import migrations from "./migrations";

class AuthDynamoDbClients extends DynamoDbClients {
  constructor(options: DynamoDbClientConfig) {
    super(migrations, options);
  }
}

export { AuthDynamoDbClients };

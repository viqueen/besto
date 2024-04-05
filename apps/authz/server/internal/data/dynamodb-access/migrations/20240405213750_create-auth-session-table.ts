import { CreateTableMigration } from "@besto/lib-node-sdk";

import { tables } from "../tables";

class CreateAuthSessionTable extends CreateTableMigration {
  constructor() {
    super(tables.authSession);
  }
}

export { CreateAuthSessionTable };

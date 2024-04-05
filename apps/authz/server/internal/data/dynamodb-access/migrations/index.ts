import { IDynamoDbMigration } from "@besto/lib-node-sdk";

import { CreateAuthSessionTable } from "./20240405213750_create-auth-session-table";

const createAuthSessionTable = new CreateAuthSessionTable();
const migrations: IDynamoDbMigration[] = [createAuthSessionTable];

export default migrations;

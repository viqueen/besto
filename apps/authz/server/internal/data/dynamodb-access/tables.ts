import { IDocEntityTable } from "@besto/lib-node-sdk";

import { entityNames } from "../access";

const tables: Record<entityNames, IDocEntityTable> = {
  authSession: {
    name: `besto-auth-session`,
    part: `GLOBAL`,
  },
};

export { tables };

import { DocEntity, IDocEntityAccess } from "@besto/lib-node-sdk";

interface AuthSession<TPayload> extends DocEntity {
  expiresAt: Date;
  payload: TPayload;
}

interface IAuthAccess<TSessionPayload> {
  authSession: IDocEntityAccess<AuthSession<TSessionPayload>>;
}

type entityNames = keyof IAuthAccess<unknown>;

export type { AuthSession, IAuthAccess, entityNames };

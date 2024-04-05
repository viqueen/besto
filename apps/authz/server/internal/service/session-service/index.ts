import { AuthSession, IAuthAccess } from "../../data";

interface IAuthSessionService<TSessionPayload> {
  getSession(sessionId: string): Promise<AuthSession<TSessionPayload> | null>;
  setSession(
    sessionId: string,
    expiresAt: Date,
    payload: TSessionPayload,
  ): Promise<AuthSession<TSessionPayload> | null>;
  removeSession(sid: string): Promise<void>;
}

const isSessionExpired = <TPayload>(
  session: Pick<AuthSession<TPayload>, "expiresAt">,
) => {
  return Date.now() >= session.expiresAt.getTime();
};

class AuthSessionService<TSessionPayload>
  implements IAuthSessionService<TSessionPayload>
{
  constructor(private readonly access: IAuthAccess<TSessionPayload>) {}

  async getSession(sid: string): Promise<AuthSession<TSessionPayload> | null> {
    return await this.access.authSession.reader.findBySort({ sort: sid });
  }

  async removeSession(sid: string): Promise<void> {
    await this.access.authSession.writer.removeOne({ sort: sid });
  }

  async setSession(
    sid: string,
    expiresAt: Date,
    payload: TSessionPayload,
  ): Promise<AuthSession<TSessionPayload> | null> {
    if (isSessionExpired({ expiresAt })) {
      await this.removeSession(sid);
      return null;
    }
    const session = await this.access.authSession.reader.findBySort({
      sort: sid,
    });
    const entity = session
      ? { ...session, expiresAt }
      : {
          sort: sid,
          createdAt: new Date(),
          expiresAt,
          payload,
          removedAt: null,
        };
    return this.access.authSession.writer.saveOne(entity);
  }
}

export type { IAuthSessionService };
export { AuthSessionService };

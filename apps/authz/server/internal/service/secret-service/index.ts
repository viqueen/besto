interface OAuth2Config {
  clientID: string;
  clientSecret: string;
}

interface ISecretService {
  cookie(): Promise<string>;
  google(): Promise<OAuth2Config>;
  github(): Promise<OAuth2Config>;
}

class DotEnvSecretService implements ISecretService {
  async cookie(): Promise<string> {
    return process.env.COOKIE_SECRET || "";
  }

  async google(): Promise<OAuth2Config> {
    return {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    };
  }

  async github(): Promise<OAuth2Config> {
    return {
      clientID: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    };
  }
}

export type { ISecretService };
export { DotEnvSecretService };

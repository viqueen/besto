import {
  Identity,
  IdentityProfile,
  IdentityServiceClient,
  SignInRequest,
  SignUpRequest,
} from "@besto/api-node-sdk";
import * as grpc from "@grpc/grpc-js";

interface IIdentityService {
  signUp: (profile: IdentityProfile) => Promise<Identity>;
  signIn: (profile: IdentityProfile) => Promise<Identity>;
}

class IdentityService implements IIdentityService {
  private readonly client: IdentityServiceClient;

  constructor() {
    this.client = new IdentityServiceClient(
      "identity-server:40041",
      grpc.credentials.createInsecure(),
    );
  }

  async signUp(profile: IdentityProfile): Promise<Identity> {
    return new Promise((resolve, reject) => {
      this.client.SignUp(
        new SignUpRequest({ profile }),
        {},
        (error, response) => {
          if (error) {
            reject(error);
          } else if (response?.has_identity) {
            resolve(response?.identity);
          }
        },
      );
    });
  }

  async signIn(profile: IdentityProfile): Promise<Identity> {
    return new Promise((resolve, reject) => {
      this.client.SignIn(
        new SignInRequest({ profile }),
        {},
        (error, response) => {
          if (error) {
            reject(error);
          } else if (response?.has_identity) {
            resolve(response?.identity);
          }
        },
      );
    });
  }
}

export type { IIdentityService };
export { IdentityService };

interface Gateway {
  authzSignIn: {
    google: string;
    github: string;
  };
  authzSignUp: {
    google: string;
    github: string;
  };
}

declare const __GATEWAY__: Gateway;
const gateway: Gateway = __GATEWAY__;

export { gateway };

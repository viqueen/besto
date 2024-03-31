interface IdentityApi {
  signUp: () => void;
  signIn: () => void;
  signOut: () => void;
}

const identityApi = (): IdentityApi => {
  const signUp = () => {
    console.info("signUp");
  };

  const signIn = () => {
    console.info("signIn");
  };

  const signOut = () => {
    console.info("signOut");
  };

  return {
    signUp,
    signIn,
    signOut,
  };
};

export type { IdentityApi };
export { identityApi };

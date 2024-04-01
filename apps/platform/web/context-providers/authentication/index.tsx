import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type AuthenticationStatus = "loading" | "authenticated" | "not-authenticated";

interface Authentication {
  data: {
    status: AuthenticationStatus;
    token: string | null;
  };
  actions: {
    signIn: (claim: string) => void;
    signOut: () => void;
  };
}

const AuthenticationContext = createContext<Authentication>({
  data: {
    status: "loading",
    token: null,
  },
  actions: {
    signIn: () => {},
    signOut: () => {},
  },
});

const useAuthentication = () => useContext(AuthenticationContext);

const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const authTokenKey = "besto.platform.auth.token";

  const [status, setStatus] = useState<AuthenticationStatus>("loading");
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(authTokenKey),
  );

  const signIn = (claim: string) => {
    console.info("** signIn", claim);
  };

  const signOut = () => {
    console.info("** signOut");
  };

  return (
    <AuthenticationContext.Provider
      value={{
        data: { status, token },
        actions: { signIn, signOut },
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export type { Authentication, AuthenticationStatus };
export { useAuthentication, AuthenticationProvider };

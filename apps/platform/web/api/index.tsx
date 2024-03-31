import React, { createContext, PropsWithChildren, useContext } from "react";

import { identityApi, IdentityApi } from "./identity-api";

interface API {
  identityAPI: IdentityApi;
}

const APIContext = createContext<API>({
  identityAPI: {
    signUp: () => {},
    signIn: () => {},
    signOut: () => {},
  },
});

const useAPI = () => useContext<API>(APIContext);

const APIProvider = ({ children }: PropsWithChildren) => {
  const identityAPI = identityApi();

  return (
    <APIContext.Provider value={{ identityAPI }}>
      {children}
    </APIContext.Provider>
  );
};

export type { API };
export { useAPI, APIProvider };

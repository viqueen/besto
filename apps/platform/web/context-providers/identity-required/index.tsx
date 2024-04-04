import React, { createContext, PropsWithChildren, useContext } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";

import { Identity } from "@besto/api-web-sdk";
import { CircularProgress } from "@mui/material";

import { useConnectApi } from "../connect-api";

const IdentityContext = createContext<{ identity: Identity }>({
  identity: {} as Identity,
});

const IdentityProvider = ({
  children,
  identity,
}: PropsWithChildren<{ identity: Identity }>) => {
  return (
    <IdentityContext.Provider value={{ identity }}>
      {children}
    </IdentityContext.Provider>
  );
};

const useIdentity = () => useContext(IdentityContext);

const IdentityRequired = ({ children }: PropsWithChildren) => {
  const { identityClient } = useConnectApi();
  const { data, error, isLoading } = useQuery(
    "getIdentity",
    async () => {
      return await identityClient.getIdentity({});
    },
    {
      // TODO: fix retry logic when the error is a 5xx error
      retry: false,
    },
  );

  return (
    <>
      {isLoading && <CircularProgress color="secondary" />}
      {!isLoading && (!data?.identity || error) && <Navigate to="/login" />}
      {!isLoading && data?.identity && !error && (
        <IdentityProvider identity={data.identity}>{children}</IdentityProvider>
      )}
    </>
  );
};

export { IdentityRequired, IdentityProvider, useIdentity };

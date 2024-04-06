import React, { createContext, PropsWithChildren, useContext } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";

import { Identity } from "@besto/api-web-sdk";
import { CircularProgress } from "@mui/material";

import { useConnectApi } from "../connect-api";

const IdentityContext = createContext<{ identity: Identity }>({
  identity: {} as Identity,
});

const ProfileProvider = ({
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

const ProfileRequired = ({ children }: PropsWithChildren) => {
  const { profileClient } = useConnectApi();
  const { data, error, isLoading } = useQuery(
    "getProfile",
    async () => {
      return await profileClient.getProfile({});
    },
    {
      // TODO: fix retry logic when the error is a 5xx error
      retry: false,
    },
  );

  return (
    <>
      {isLoading && <CircularProgress color="secondary" />}
      {!isLoading && (!data?.profile?.identity || error) && (
        <Navigate to="/login" />
      )}
      {!isLoading && data?.profile?.identity && !error && (
        <ProfileProvider identity={data.profile.identity}>
          {children}
        </ProfileProvider>
      )}
    </>
  );
};

export { ProfileRequired, ProfileProvider, useIdentity };

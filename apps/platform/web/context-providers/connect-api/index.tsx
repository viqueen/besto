import React, { createContext, PropsWithChildren, useContext } from "react";

import { IdentityService } from "@besto/api-web-sdk";
import { createPromiseClient, PromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";

interface ConnectApi {
  identityClient: PromiseClient<typeof IdentityService>;
}

const ConnectApiContext = createContext<ConnectApi>({
  identityClient: {} as PromiseClient<typeof IdentityService>,
});

const useConnectApi = () => useContext(ConnectApiContext);

const ConnectApiProvider = ({ children }: PropsWithChildren) => {
  const transport = createGrpcWebTransport({
    baseUrl: "http://localhost:8080",
    credentials: "include",
  });

  const identityClient = createPromiseClient(IdentityService, transport);

  return (
    <ConnectApiContext.Provider value={{ identityClient }}>
      {children}
    </ConnectApiContext.Provider>
  );
};

export { useConnectApi, ConnectApiProvider };

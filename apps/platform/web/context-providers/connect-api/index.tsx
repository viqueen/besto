import React, { createContext, PropsWithChildren, useContext } from "react";

import { ProfileService } from "@besto/api-web-sdk";
import { createPromiseClient, PromiseClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";

import { loggingInterceptor } from "./interceptors";

interface ConnectApi {
  profileClient: PromiseClient<typeof ProfileService>;
}

const ConnectApiContext = createContext<ConnectApi>({
  profileClient: {} as PromiseClient<typeof ProfileService>,
});

const useConnectApi = () => useContext(ConnectApiContext);

const ConnectApiProvider = ({ children }: PropsWithChildren) => {
  const transport = createGrpcWebTransport({
    baseUrl: "http://localhost:8080",
    credentials: "include",
    interceptors: [loggingInterceptor()],
  });

  const profileClient = createPromiseClient(ProfileService, transport);

  return (
    <ConnectApiContext.Provider value={{ profileClient }}>
      {children}
    </ConnectApiContext.Provider>
  );
};

export { useConnectApi, ConnectApiProvider };

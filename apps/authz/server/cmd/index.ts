import { localstackDynamoDbClientConfig } from "@besto/lib-node-sdk";
import express, { Express } from "express";
import morgan from "morgan";

import { bootstrapAuth } from "../internal/bootstrap";
import { authenticationEndpoint } from "../internal/endpoint";

interface WithExpressApp {
  app: Express;
}

const createExpressApp = async (): Promise<WithExpressApp> => {
  const app = express();
  app.use(morgan("combined"));
  return { app };
};

const configureAuthz = async ({
  app,
}: WithExpressApp): Promise<WithExpressApp> => {
  const { services, product, secrets } = await bootstrapAuth(
    localstackDynamoDbClientConfig,
    true,
  );
  await authenticationEndpoint({
    app,
    services,
    product,
    secrets,
  });
  return { app };
};

const startExpressApp = async ({ app }: WithExpressApp) => {
  const port = 4000;
  const server = app.listen(port, () => {
    console.info(`⚡️[besto-auth] ready at http://localhost:${port}`);
  });
  const shutdown = () => {
    console.info(`\n🛑[besto-auth] tear down`);
    server.close();
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
};

createExpressApp()
  .then(configureAuthz)
  .then(startExpressApp)
  .catch(console.error);

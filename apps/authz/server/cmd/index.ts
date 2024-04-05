import path from "path";

import { localstackDynamoDbClientConfig } from "@besto/lib-node-sdk";
import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";

import { bootstrapAuth } from "../internal/bootstrap";
import { apiEndpoint, authenticationEndpoint } from "../internal/endpoint";
import { withPassportAuth } from "../internal/middleware";

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
  const { services, product } = await bootstrapAuth(
    localstackDynamoDbClientConfig,
    true,
  );
  await withPassportAuth({ app, services });
  await authenticationEndpoint({
    app,
    services,
    product,
  });
  await apiEndpoint({ app });
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

dotenv.config({ path: path.resolve(__dirname, ".env.localstack") });
dotenv.config({ path: path.resolve(__dirname, ".env") });
createExpressApp()
  .then(configureAuthz)
  .then(startExpressApp)
  .catch(console.error);

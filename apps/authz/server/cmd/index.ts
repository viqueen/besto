import path from "path";

import dotenv from "dotenv";
import express, { Express } from "express";
import morgan from "morgan";

import { bootstrapAuth } from "../internal/bootstrap";
import {
  apiEndpoint,
  signInEndpoint,
  signUpEndpoint,
} from "../internal/endpoint";
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
    { region: "us-east-1", endpoint: "http://aws-localstack:4566" },
    true,
  );
  await withPassportAuth({
    app,
    services,
    middlewares: [],
  });
  await signUpEndpoint({ app, services, product });
  await signInEndpoint({
    app,
    services,
    product,
  });
  await apiEndpoint({ app, services });
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

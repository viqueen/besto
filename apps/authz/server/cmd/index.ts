import express, { Express } from "express";
import morgan from "morgan";

interface WithExpressApp {
  app: Express;
}

const createExpressApp = async (): Promise<WithExpressApp> => {
  const app = express();
  app.use(morgan("combined"));
  return { app };
};

const configureEndpoints = async ({
  app,
}: WithExpressApp): Promise<WithExpressApp> => {
  app.get("/authz", (_req, res, _next) => {
    res.sendStatus(200);
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
  .then(configureEndpoints)
  .then(startExpressApp)
  .catch(console.error);

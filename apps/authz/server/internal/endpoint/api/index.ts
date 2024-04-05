import { Express } from "express";

interface ApiEndpointProps {
  app: Express;
}

const apiEndpoint = async ({ app }: ApiEndpointProps) => {
  app.post("/api/*", (_request, response) => {
    response.sendStatus(200);
  });
};

export { apiEndpoint };

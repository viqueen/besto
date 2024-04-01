import React from "react";

import { Grid, Typography } from "@mui/material";

import { Widget } from "../components";

const OpsSection = () => {
  const neo4jWidget = {
    title: "Neo4j",
    description: "Graph database",
    links: {
      docs: "https://neo4j.com/docs/",
      browser: "http://localhost:7474/browser",
    },
    auth: {
      username: "neo4j",
      password: "password",
    },
  };
  const grafanaWidget = {
    title: "Grafana",
    description: "Observability platform",
    links: {
      docs: "https://grafana.com/docs/",
      browser: "http://localhost:3000/",
    },
    auth: {
      username: "admin",
      password: "admin",
    },
  };
  const envoyWidget = {
    title: "Envoy",
    description: "Service mesh",
    links: {
      docs: "https://www.envoyproxy.io/docs/envoy/v1.29.2/",
      browser: "http://localhost:9900/",
    },
    auth: {
      username: "admin",
      password: "admin",
    },
  };
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Ops
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Widget {...grafanaWidget} />
        </Grid>
        <Grid item xs={3}>
          <Widget {...neo4jWidget} />
        </Grid>
        <Grid item xs={3}>
          <Widget {...envoyWidget} />
        </Grid>
      </Grid>
    </>
  );
};

export { OpsSection };

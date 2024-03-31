import React from "react";

import { Grid, Typography } from "@mui/material";

import { Widget } from "../components";

const AppsSection = () => {
  const platformWidget = {
    title: "Platform",
    description: "Platform",
    links: {
      docs: "#",
      browser: "http://localhost:10000/",
    },
    auth: {
      username: "admin",
      password: "admin",
    },
  };
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Apps
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Widget {...platformWidget} />
        </Grid>
      </Grid>
    </>
  );
};

export { AppsSection };

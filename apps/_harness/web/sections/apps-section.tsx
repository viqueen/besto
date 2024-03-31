import React from "react";

import { Grid, Typography } from "@mui/material";

import { Widget } from "../components";

const AppsSection = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Apps
      </Typography>
      <Grid container spacing={2}></Grid>
    </>
  );
};

export { AppsSection };

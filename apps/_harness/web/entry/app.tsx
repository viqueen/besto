import React from "react";

import { PageLayout } from "@besto/lib-web-sdk";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { Divider } from "@mui/material";

import { AppsSection, OpsSection } from "../sections";

const App = () => {
  const topNav = { Logo: DialpadIcon, productName: "@besto/harness" };
  const sidebarNav = {};
  return (
    <PageLayout topNav={topNav} sidebarNav={sidebarNav}>
      <OpsSection />
      <Divider sx={{ my: 2 }} />
      <AppsSection />
    </PageLayout>
  );
};

export { App };

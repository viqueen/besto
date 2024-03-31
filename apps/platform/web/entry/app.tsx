import React from "react";

import { PageLayout } from "@besto/lib-web-sdk";
import DialpadIcon from "@mui/icons-material/Dialpad";

const App = () => {
  const topNav = { Logo: DialpadIcon, productName: "@besto/platform" };
  const sidebarNav = {};
  return (
    <PageLayout topNav={topNav} sidebarNav={sidebarNav}>
      <h1>platform</h1>
    </PageLayout>
  );
};

export { App };

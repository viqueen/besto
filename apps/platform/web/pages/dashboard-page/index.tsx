import React from "react";

import { IdentityRequired } from "../../context-providers";

const DashboardPage = () => {
  return (
    <IdentityRequired>
      <div>
        <h1>Dashboard page</h1>
      </div>
    </IdentityRequired>
  );
};

export { DashboardPage };

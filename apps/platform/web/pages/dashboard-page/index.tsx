import React from "react";

import { ProfileRequired } from "../../context-providers";

const DashboardPage = () => {
  return (
    <ProfileRequired>
      <div>
        <h1>Dashboard page</h1>
      </div>
    </ProfileRequired>
  );
};

export { DashboardPage };

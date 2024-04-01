import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import { PageLayout } from "@besto/lib-web-sdk";
import DialpadIcon from "@mui/icons-material/Dialpad";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createRoot, hydrateRoot } from "react-dom/client";

import {
  AuthenticationProvider,
  ConnectApiProvider,
} from "../context-providers";
import { DashboardPage, LoginPage } from "../pages";

const App = () => {
  const topNav = { Logo: DialpadIcon, productName: "@besto/platform" };
  const sidebarNav = {};
  return (
    <PageLayout topNav={topNav} sidebarNav={sidebarNav}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </HashRouter>
    </PageLayout>
  );
};

const Platform = () => {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FF5630",
      },
      secondary: {
        main: "#FF7452",
      },
    },
  });

  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthenticationProvider>
        <QueryClientProvider client={queryClient}>
          <ConnectApiProvider>
            <App />
          </ConnectApiProvider>
        </QueryClientProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

const rootContainer = document.querySelector("#root");
if (rootContainer) {
  if (rootContainer.hasChildNodes()) {
    hydrateRoot(rootContainer, <Platform />);
  } else {
    createRoot(rootContainer).render(<Platform />);
  }
}

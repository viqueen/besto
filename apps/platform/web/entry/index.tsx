import React from "react";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createRoot, hydrateRoot } from "react-dom/client";

import { App } from "./app";
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
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

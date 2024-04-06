import React from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Divider, Stack } from "@mui/material";

import { gateway } from "../../components";

const LoginPage = () => {
  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
        </Box>
        <Divider textAlign="center">Sign In</Divider>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          href={gateway.authzSignIn.github}
        >
          with github
        </Button>
        <Divider textAlign="center">or Sign Up</Divider>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          href={gateway.authzSignUp.github}
        >
          with github
        </Button>
      </Stack>
    </Container>
  );
};

export { LoginPage };

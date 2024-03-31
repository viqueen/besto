import React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface WidgetProps {
  title: string;
  description: string;
  auth: {
    username: string;
    password: string;
  };
  links: {
    docs: string;
    browser: string;
  };
}

const Widget = ({ title, description, auth, links }: WidgetProps) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Username</b>: {auth.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Password</b>: {auth.password}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href={links.browser} target="_blank">
          view
        </Button>
        <Button href={links.docs} target="_blank">
          docs
        </Button>
      </CardActions>
    </Card>
  );
};

export type { WidgetProps };
export { Widget };

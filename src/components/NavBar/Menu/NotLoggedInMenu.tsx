import React from "react";
import { Button } from "@material-ui/core";

/**
 * Renders Login and Register buttons
 */
export function NotLoggedInMenu() {
  return (
    <div>
      <Button href="/login" color="inherit">
        Login
      </Button>
      <Button href="/register" color="inherit">
        Register
      </Button>
    </div>
  );
}

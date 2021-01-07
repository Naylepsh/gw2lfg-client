import { TextField } from "@material-ui/core";
import React from "react";

interface RaidPostFormDescriptionProps {
  id: string;
  onChange: any;
  variant?: "filled" | "outlined" | "standard";
}

// Renders a textarea with its value attached to an associated raid post form
export default function RaidPostFormDescription(
  props: RaidPostFormDescriptionProps
) {
  return (
    <TextField
      label="Description"
      multiline
      rows={4}
      placeholder="Description..."
      fullWidth
      {...props}
      variant={props.variant ?? "standard"}
    />
  );
}

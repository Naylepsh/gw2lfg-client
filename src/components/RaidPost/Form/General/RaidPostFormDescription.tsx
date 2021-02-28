import { TextField, TextFieldProps } from "@material-ui/core";
import React from "react";

type RaidPostFormDescriptionProps = TextFieldProps;

/**
 * Renders a textarea with its value attached to an associated raid post form
 */
export default function RaidPostFormDescription(
  props: RaidPostFormDescriptionProps
) {
  return (
    <TextField label="Description" multiline rows={4} fullWidth {...props} />
  );
}

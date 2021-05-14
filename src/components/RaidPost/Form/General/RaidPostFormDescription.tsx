import { Field } from "formik";
import { TextField, TextFieldProps } from "formik-material-ui";
import React from "react";

interface RaidPostFormDescriptionProps {
  name: string;
}

/**
 * Renders a textarea with its value attached to an associated raid post form
 */
export default function RaidPostFormDescription({
  name,
}: RaidPostFormDescriptionProps) {
  return <Field component={MyTextField} label="Description" name={name} />;
}

function MyTextField(props: TextFieldProps) {
  return <TextField {...props} multiline rows={4} fullWidth />;
}

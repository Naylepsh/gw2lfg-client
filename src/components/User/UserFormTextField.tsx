import React from "react";
import { TextFieldProps } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Field } from "formik";

export type UserFormTextFieldProps = TextFieldProps;

/**
 * Wrapper around TextField that sets properties commonly used in user forms
 */
export function UserFormTextField(props: UserFormTextFieldProps) {
  return (
    <Field
      component={TextField}
      label={props.label}
      name={props.name}
      variant="outlined"
      margin="normal"
      fullWidth
      autoFocus
      {...props}
    />
  );
}

import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";

export type UserFormTextFieldProps = TextFieldProps;

/**
 * Wrapper around TextField that sets properties commonly used in user forms
 */
export function UserFormTextField(props: UserFormTextFieldProps) {
  return (
    <FormTextField
      variant="outlined"
      margin="normal"
      fullWidth
      autoFocus
      {...props}
    />
  );
}

export type FormTextFieldProps = TextFieldProps;

function FormTextField(props: FormTextFieldProps) {
  const { error, helperText } = props;

  return (
    <TextField {...props} error={error} helperText={error && helperText} />
  );
}

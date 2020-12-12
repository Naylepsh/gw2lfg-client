import React, { ChangeEvent } from "react";
import { TextField } from "@material-ui/core";

export interface UserFormTextFieldProps {
  id: string;
  label: string;
  name: string;
  onChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  required?: boolean;
  autoComplete?: string;
  type?: string;
}

export function UserFormTextField(props: UserFormTextFieldProps) {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      autoFocus
      {...props}
    />
  );
}

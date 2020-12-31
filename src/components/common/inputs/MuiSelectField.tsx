import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { FieldInputProps } from "formik";
import React, { ReactNode } from "react";

interface MaterialUISelectFieldProps extends FieldInputProps<string> {
  errorString?: string;
  children: ReactNode;
  label: string;
  required: boolean;
}

export function MaterialUISelectField({
  errorString,
  label,
  children,
  value,
  name,
  onChange,
  onBlur,
  required,
}: MaterialUISelectFieldProps) {
  return (
    <FormControl fullWidth>
      <InputLabel required={required}>{label}</InputLabel>
      <Select name={name} onChange={onChange} onBlur={onBlur} value={value}>
        {children}
      </Select>
      <FormHelperText>{errorString}</FormHelperText>
    </FormControl>
  );
}

export default React.memo(
  MaterialUISelectField,
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

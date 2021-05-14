import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { ErrorMessage, Field } from "formik";
import { Select } from "formik-material-ui";
import React from "react";

interface SelectInputProps {
  name: string;
  items: {
    label: string;
    value: number | string;
  }[];
  label: string;
  required?: boolean;
}

/**
 * Renders a select field with a Material UI looks and Formik functionality.
 */
export default function SelectInput({
  name,
  items,
  label,
  required = false,
}: SelectInputProps) {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Field
        component={MemoisedSelect}
        name={name}
        required={required}
        inputProps={{
          id: label,
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Field>
      <FormHelperText>
        <ErrorMessage name={name} />
      </FormHelperText>
    </FormControl>
  );
}

const MemoisedSelect = React.memo(Select, (prevProps, nextProps) => {
  return prevProps.field.value === nextProps.field.value;
});

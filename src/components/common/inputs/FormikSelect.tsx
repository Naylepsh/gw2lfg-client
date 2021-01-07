import { MenuItem } from "@material-ui/core";
import { ErrorMessage, Field } from "formik";
import React from "react";
import MuiSelectField from "./MuiSelectField";

export interface FormikSelectItem {
  label: string;
  value: string;
}

interface FormikSelectProps {
  name: string;
  items: FormikSelectItem[];
  label: string;
  required?: boolean;
}

// Renders a select field with a Material UI looks and Formik functionality
// taken from: https://github.com/angle943/formik-material-ui/blob/master/src/components/FormikSelect/index.tsx
// It was the only reliable way I found of mixing Material UI and Formik together
export default function FormikSelect({
  name,
  items,
  label,
  required = false,
}: FormikSelectProps) {
  return (
    <div className="FormikSelect">
      <Field
        name={name}
        as={MuiSelectField}
        label={label}
        errorString={<ErrorMessage name={name} />}
        required={required}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Field>
    </div>
  );
}

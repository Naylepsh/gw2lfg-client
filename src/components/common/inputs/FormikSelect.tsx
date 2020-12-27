import { MenuItem } from "@material-ui/core";
import { ErrorMessage, Field } from "formik";
import React from "react";
import MaterialUISelectField from "./MaterialUISelectField";

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
        as={MaterialUISelectField}
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

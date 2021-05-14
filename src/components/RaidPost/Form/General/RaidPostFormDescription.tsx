import { Field } from "formik";
import { TextField, TextFieldProps } from "formik-material-ui";
import React from "react";

interface RaidPostFormDescriptionProps {
  name: string;
}

/**
 * Renders a textarea with its value attached to an associated raid post form
 */
export function RaidPostFormDescription({
  name,
}: RaidPostFormDescriptionProps) {
  return (
    <Field
      component={MemoisedDescriptionTextField}
      label="Description"
      name={name}
    />
  );
}

const MemoisedDescriptionTextField = React.memo(
  DescriptionTextField,
  (prevProps, nextProps) => prevProps.field.value === nextProps.field.value
);

function DescriptionTextField(props: TextFieldProps) {
  return <TextField {...props} multiline rows={4} fullWidth />;
}

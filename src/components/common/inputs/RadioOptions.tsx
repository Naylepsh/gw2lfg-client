import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@material-ui/core";
import React from "react";
import { Field } from "formik";
import { RadioGroup } from "formik-material-ui";

export interface RadioOptionsProps<T> {
  options: { value: T; label: string }[];
  name: string;
  title?: string;
}

export function RadioOptions<T>(props: RadioOptionsProps<T>) {
  return (
    <FormControl component="fieldset">
      {props.title || <FormLabel component="legend">{props.title}</FormLabel>}
      <Field component={RadioGroup} name={props.name}>
        {props.options.map(({ value, label }) => (
          <FormControlLabel value={value} control={<Radio />} label={label} />
        ))}
      </Field>
    </FormControl>
  );
}

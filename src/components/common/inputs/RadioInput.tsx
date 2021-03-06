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
  items: { value: T; label: string }[];
  name: string;
  title?: string;
}

export function RadioInput<T>(props: RadioOptionsProps<T>) {
  return (
    <FormControl component="fieldset">
      {props.title || <FormLabel component="legend">{props.title}</FormLabel>}
      <Field component={RadioGroup} name={props.name}>
        {props.items.map(({ value, label }, i) => (
          <FormControlLabel
            key={i}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </Field>
    </FormControl>
  );
}

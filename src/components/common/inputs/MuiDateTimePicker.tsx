import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

interface MuiDateTimePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: any;
}

export default function MuiDateTimePicker(props: MuiDateTimePickerProps) {
  const { id, label, value, onChange } = props;

  // onChange on DateTimePicker passes date instead of an event,
  // but Formik requires an event as an argument, thus this weird wrapper
  const handleChange = (value: Date) => onChange({ target: { value, id } });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        id={id}
        autoOk
        ampm={false}
        value={value}
        disablePast
        onChange={handleChange}
        label={label}
      />
    </MuiPickersUtilsProvider>
  );
}

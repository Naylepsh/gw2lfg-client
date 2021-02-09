import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

interface MuiDateTimePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: any;
  required?: boolean;
}

/* 
Renders a date picker with past dates disabled
*/
export default function MuiDateTimePicker(props: MuiDateTimePickerProps) {
  const { id, label, value, onChange, required } = props;

  // onChange on DateTimePicker passes date instead of an event,
  // thus this weird wrapper to make it consistent with other form inputs
  const handleChange = (value: Date) => {
    const isoString = value.toISOString();
    onChange({ target: { value: isoString, id } });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        id={id}
        autoOk
        ampm={false}
        value={value !== "" ? value : null}
        disablePast
        onChange={handleChange}
        label={label}
        fullWidth
        required={required}
      />
    </MuiPickersUtilsProvider>
  );
}

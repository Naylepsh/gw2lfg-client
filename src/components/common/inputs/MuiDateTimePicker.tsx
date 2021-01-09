import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

interface MuiDateTimePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: any;
}

/* 
Renders a date picker with past dates disabled
*/
export default function MuiDateTimePicker(props: MuiDateTimePickerProps) {
  const { id, label, value, onChange } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        id={id}
        autoOk
        ampm={false}
        value={value !== "" ? value : null}
        disablePast
        onChange={onChange}
        label={label}
        required
      />
    </MuiPickersUtilsProvider>
  );
}

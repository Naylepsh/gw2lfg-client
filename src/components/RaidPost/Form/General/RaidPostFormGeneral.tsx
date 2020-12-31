import { Typography, Box } from "@material-ui/core";
import React from "react";
import MuiDateTimePicker from "../../../common/inputs/MuiDateTimePicker";
import FormikSelect from "../../../common/inputs/FormikSelect";
import RaidPostFormDescription from "./RaidPostFormDescription";

interface RaidPostFormGeneralProps {
  serverId: string;
  dateId: string;
  dateSelected: string;
  descriptionId: string;
  onChange: any;
}

export default function RaidPostFormGeneral(props: RaidPostFormGeneralProps) {
  const { serverId, dateId, dateSelected, descriptionId, onChange } = props;
  const servers = [
    { label: "EU", value: "EU" },
    { label: "NA", value: "NA" },
  ];

  // onChange on DateTimePicker passes date instead of an event,
  // but Formik requires an event as an argument, thus this weird wrapper
  const handleDateChange = (value: Date) =>
    onChange({ target: { value, id: dateId } });

  return (
    <Box
      my={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h6">General</Typography>
      <Box display="flex" flexDirection="row" width="100%">
        <Box ml={3} mr={5} minWidth={120}>
          <FormikSelect
            name={serverId}
            items={servers}
            label="Server"
            required
          />
          <MuiDateTimePicker
            id={dateId}
            label="Date"
            value={dateSelected}
            onChange={handleDateChange}
          />
        </Box>
        <RaidPostFormDescription id={descriptionId} onChange={onChange} />
      </Box>
    </Box>
  );
}

import { Typography, Box, Grid } from "@material-ui/core";
import React from "react";
import MuiDateTimePicker from "../../../common/inputs/MuiDateTimePicker";
import SelectInput from "../../../common/inputs/SelectInput";
import RaidPostFormDescription from "./RaidPostFormDescription";

interface RaidPostFormGeneralProps {
  serverId: string;
  dateId: string;
  dateSelected: string;
  descriptionId: string;
  onChange: any;
}

/**
 * Renders 'simple', more general properties of raid post form.
 */
export default function RaidPostFormGeneral(props: RaidPostFormGeneralProps) {
  const { serverId, dateId, dateSelected, descriptionId, onChange } = props;
  const servers = [
    { label: "EU", value: "EU" },
    { label: "NA", value: "NA" },
  ];

  return (
    <Box
      my={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h6">General</Typography>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={2}>
          <SelectInput
            name={serverId}
            items={servers}
            label="Server"
            required
          />
          <MuiDateTimePicker
            id={dateId}
            label="Date"
            value={dateSelected}
            onChange={onChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <RaidPostFormDescription name={descriptionId} />
        </Grid>
      </Grid>
    </Box>
  );
}

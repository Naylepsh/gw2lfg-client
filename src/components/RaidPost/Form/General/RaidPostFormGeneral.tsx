import { Typography, Box, Grid } from "@material-ui/core";
import React from "react";
import MuiDateTimePicker from "../../../common/inputs/MuiDateTimePicker";
import FormikSelect from "../../../common/inputs/FormikSelect";
import RaidPostFormDescription from "./RaidPostFormDescription";

interface RaidPostFormGeneralProps {
  serverId: string;
  dateId: string;
  dateSelected: string;
  descriptionId: string;
  descriptionValue: string;
  onChange: any;
}

/* 
Renders 'simple', more general properties of raid post form.
*/
export default function RaidPostFormGeneral(props: RaidPostFormGeneralProps) {
  const {
    serverId,
    dateId,
    dateSelected,
    descriptionId,
    descriptionValue,
    onChange,
  } = props;
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
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <RaidPostFormDescription
            id={descriptionId}
            onChange={onChange}
            value={descriptionValue}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

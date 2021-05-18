import {
  FormControl,
  FormLabel,
  FormGroup,
  Grid,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import React from "react";
import MuiDateTimePicker from "../../../common/inputs/MuiDateTimePicker";
import SelectInput from "../../../common/inputs/SelectInput";
import { RaidPostFormDescription } from "./RaidPostFormDescription";

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

  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <FormLabel component="legend">General</FormLabel>
      <FormGroup className={classes.formGroup}>
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
      </FormGroup>
    </FormControl>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "30px",
    },
    formGroup: {
      width: "100%",
    },
  })
);

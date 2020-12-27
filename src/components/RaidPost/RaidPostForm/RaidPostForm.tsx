import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import { useGetRaidBossesQuery } from "../../../hooks/queries/raid-bosses/useGetRaidBossesQuery";
import MuiDateTimePicker from "../../common/inputs/MuiDateTimePicker";
import FormikSelect from "../../common/inputs/FormikSelect";
import RaidPostFormRaidBossesOptions from "./RaidPostFormRaidBossesOptions";

interface RaidPostFormProps {}

export default function RaidPostForm(props: RaidPostFormProps) {
  const initialValues = {
    server: "",
    date: new Date().toISOString(),
    description: "",
    selectedBosses: [] as string[],
  };
  const { isLoading, isError, data: bosses } = useGetRaidBossesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Encountered error...</div>;

  return (
    <Container component={Paper}>
      <Box
        my={3}
        p={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4">Create Raid Post</Typography>
        <Formik
          onSubmit={(values, {}) => console.log(values)}
          initialValues={initialValues}
        >
          {(formProps) => {
            const { handleChange, values } = formProps;
            return (
              <Form>
                <RaidPostFormGeneral
                  serverId="server"
                  dateId="date"
                  dateSelected={values.date}
                  descriptionId="description"
                  onChange={handleChange}
                />
                <RaidPostFormRaidBossesOptions
                  bosses={bosses}
                  onChange={handleChange}
                  name="selectedBosses"
                  selectedBosses={values.selectedBosses}
                />
                <RaidPostFormRequirementsOptions />
                <RaidPostFormRoles />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}

interface RaidPostFormGeneralProps {
  serverId: string;
  dateId: string;
  dateSelected: string;
  descriptionId: string;
  onChange: any;
}

function RaidPostFormGeneral(props: RaidPostFormGeneralProps) {
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
            onChange={onChange}
          />
        </Box>
        <RaidPostFormDescription id={descriptionId} onChange={onChange} />
      </Box>
    </Box>
  );
}

interface RaidPostFormDescriptionProps {
  id: string;
  onChange: any;
}

function RaidPostFormDescription(props: RaidPostFormDescriptionProps) {
  return (
    <TextField
      label="Description"
      multiline
      rows={4}
      placeholder="Description..."
      variant="outlined"
      fullWidth
      {...props}
    />
  );
}

function RaidPostFormRequirementsOptions() {
  return <div>requirements...</div>;
}

function RaidPostFormRoles() {
  return <div>roles...</div>;
}

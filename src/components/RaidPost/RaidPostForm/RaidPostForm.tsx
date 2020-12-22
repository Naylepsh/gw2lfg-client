import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { useGetRaidBossesQuery } from "../../../hooks/queries/raid-bosses/useGetRaidBossesQuery";
import RaidBossAvatar from "../../RaidBoss/RaidBossAvatar";

interface RaidPostFormProps {}

export default function RaidPostForm(props: RaidPostFormProps) {
  const initialValues = { description: "" };
  const [selectedBosses, setSelectedBosses] = useState(
    new Map<string, boolean>()
  );

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
            const { handleChange } = formProps;
            return (
              <Form>
                <RaidPostFormDescription
                  id="description"
                  onChange={handleChange}
                />
                <RaidPostFormRaidBossesOptions />
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

interface RaidPostFormDescriptionProps {
  id: string;
  onChange: any;
}

function RaidPostFormDescription(props: RaidPostFormDescriptionProps) {
  return (
    <TextField
      id={props.id}
      label="Description"
      multiline
      rows={4}
      placeholder="Description..."
      variant="outlined"
      fullWidth
      onChange={props.onChange}
    />
  );
}

function RaidPostFormRaidBossesOptions() {
  const { isLoading, isError, error, data: bosses } = useGetRaidBossesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Encountered error...</div>;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      my={3}
    >
      <Typography variant="h6">Raid Bosses</Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {bosses.map((boss) => (
          <RaidBossAvatar {...boss} />
        ))}
      </Box>
    </Box>
  );
}

function RaidPostFormRequirementsOptions() {
  return <div>requirements...</div>;
}

function RaidPostFormRoles() {
  return <div>roles...</div>;
}

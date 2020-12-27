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
import { RaidBossDTO } from "../../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidPostFormRaidBossOption from "./RaidPostFormRaidBossOption";

interface RaidPostFormProps {}

export default function RaidPostForm(props: RaidPostFormProps) {
  const initialValues = { description: "", selectedBosses: [] as string[] };
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
                <RaidPostFormDescription
                  id="description"
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

interface RaidPostFormRaidBossesOptionsProps {
  bosses: RaidBossDTO[];
  onChange: any;
  name: string;
  selectedBosses: string[];
}

function RaidPostFormRaidBossesOptions(
  props: RaidPostFormRaidBossesOptionsProps
) {
  const { onChange, name, selectedBosses, bosses } = props;

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
          <RaidPostFormRaidBossOption
            boss={boss}
            onChange={onChange}
            key={boss.id}
            name={name}
            checked={selectedBosses.includes(boss.id.toString())}
          />
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

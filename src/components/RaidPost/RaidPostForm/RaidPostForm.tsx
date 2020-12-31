import { Box, Button, Container, Paper, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useGetRaidBossesQuery } from "../../../hooks/queries/raid-bosses/useGetRaidBossesQuery";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import RaidPostFormGeneral from "./RaidPostFormGeneral";
import RaidPostFormRaidBossesOptions from "./RaidPostFormRaidBossesOptions";
import RaidPostFormRequirementsOptions from "./RaidPostFormRequirementsOptions";
import RaidPostFormRoles from "./RaidPostFormRoles";

interface RaidPostFormProps {}

interface Requirements {
  [key: string]: number;
}

export default function RaidPostForm(props: RaidPostFormProps) {
  const initialValues = {
    server: "",
    date: new Date().toISOString(),
    description: "",
    selectedBosses: [] as string[],
    requirements: {} as Requirements,
    roles: [] as RoleDTO[],
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
                <RaidPostFormRequirementsOptions
                  requirementsId="requirements"
                  onChange={handleChange}
                />
                <RaidPostFormRoles
                  roles={values.roles}
                  rolesId="roles"
                  onChange={handleChange}
                />
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

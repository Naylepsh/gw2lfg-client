import { Box, Button, Container, Paper, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { useGetRaidBossesQuery } from "../../../hooks/queries/raid-bosses/useGetRaidBossesQuery";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import RaidPostFormGeneral from "./General/RaidPostFormGeneral";
import RaidPostFormRaidBossesOptions from "./RaidBosses/RaidPostFormRaidBossesOptions";
import RaidPostFormRequirementsOptions from "./Requirements/RaidPostFormRequirementsOptions";
import RaidPostFormRoles from "./Roles/RaidPostFormRoles";

interface RaidPostFormProps {}

interface RequirementsProps {
  itemsProps: RequirementsItemsProps;
}

interface RequirementsItemsProps {
  [key: string]: number;
}

export default function RaidPostForm(props: RaidPostFormProps) {
  const initialValues = {
    server: "",
    date: "",
    description: "",
    selectedBosses: [] as string[],
    requirementsProps: {} as RequirementsProps,
    rolesProps: [] as RoleDTO[],
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
                  requirementsId="requirementsProps"
                  itemsId="itemsProps"
                  onChange={handleChange}
                />
                <RaidPostFormRoles
                  roles={values.rolesProps}
                  rolesId="rolesProps"
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

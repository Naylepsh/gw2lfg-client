import { Box, Button, Container, Paper, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { RaidBossDTO } from "../../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidPostFormGeneral from "./General/RaidPostFormGeneral";
import RaidPostFormRaidBossesOptions from "./RaidBosses/RaidPostFormRaidBossesOptions";
import { RaidPostFormValues } from "./RaidPostFormValues";
import RaidPostFormRequirementsOptions from "./Requirements/RaidPostFormRequirementsOptions";
import RaidPostFormRoles from "./Roles/RaidPostFormRoles";

interface RaidPostFormProps {
  onSubmit: any;
  initialValues: RaidPostFormValues;
  bosses: RaidBossDTO[];
}

// All the <propName>Id have to correspond to fields inside initialValues prop
export default function RaidPostForm(props: RaidPostFormProps) {
  const { initialValues, bosses, onSubmit } = props;

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
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {(formProps) => {
            const { handleChange, values } = formProps;

            return (
              <Form>
                <RaidPostFormGeneral
                  serverId="server"
                  dateId="date"
                  dateSelected={values.date}
                  descriptionId="description"
                  descriptionValue={values.description}
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
                  values={initialValues.requirementsProps.itemsProps}
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

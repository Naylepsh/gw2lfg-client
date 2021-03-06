import { Box, Button, Container, Paper, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { RaidBossDTO } from "../../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidPostFormGeneral from "./General/RaidPostFormGeneral";
import RaidPostFormRaidBossesOptions from "../../RaidBoss/RaidBossesOptions";
import { RaidPostFormValues } from "./RaidPostFormValues";
import RaidPostFormRequirementsOptions, {
  getKnownItems,
} from "./Requirements/RaidPostFormRequirementsOptions";
import RaidPostFormRoles from "./Roles/RaidPostFormRoles";

interface RaidPostFormProps {
  onSubmit: any;
  initialValues: RaidPostFormValues;
  bosses: RaidBossDTO[];
  title: string;
}

/**
 * Renders a raid post form that can be populated with values beforehand.
 * All the <propName>Id have to correspond to fields inside initialValues prop
 */
export default function RaidPostForm(props: RaidPostFormProps) {
  const { initialValues, title, bosses, onSubmit } = props;

  const items = getKnownItems();
  const initialItemNames = Object.keys(
    initialValues.requirementsProps.itemsProps
  );
  for (const item of items) {
    if (!initialItemNames.includes(item.name)) {
      initialValues.requirementsProps.itemsProps[item.name] = 0;
    }
  }

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
        <Typography variant="h4">{title}</Typography>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {(formProps) => {
            const { handleChange, values, errors } = formProps;

            const bossesError = errors["bossesIds"];
            const rolesError = errors["rolesProps"];

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
                  errorMessage={bossesError}
                  required
                />
                <RaidPostFormRequirementsOptions
                  requirementsId="requirementsProps"
                  itemsId="itemsProps"
                />
                <RaidPostFormRoles
                  roles={values.rolesProps}
                  rolesId="rolesProps"
                  onChange={handleChange}
                  errorMessage={rolesError as string}
                  required
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

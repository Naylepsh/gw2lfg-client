import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Form, Formik } from "formik";
import FormikSelect from "../common/inputs/FormikSelect";
import { GetPostsQueryParams } from "../../services/gw2lfg-server/raid-posts/dtos/GetRaidPostsDTO";
import MuiDateTimePicker from "../common/inputs/MuiDateTimePicker";
import { roles, classes } from "../Role/roles.json";
import { RaidBossDTO } from "../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidPostFormRaidBossesOptions from "./Form/RaidBosses/RaidPostFormRaidBossesOptions";

export const ANY = "Any";

const servers = [
  { label: "Any", value: ANY },
  { label: "EU", value: "EU" },
  { label: "NA", value: "NA" },
];

const selectableRoleNames = [...roles, { name: ANY }].map(({ name }) => ({
  label: name,
  value: name,
}));

const selectableRoleClasses = [...classes, { name: ANY }].map(({ name }) => ({
  label: name,
  value: name,
}));

interface GetRaidPostsFilterFormProps {
  onSubmit: any;
  initialValues: GetPostsQueryParams;
  bosses: RaidBossDTO[];
}

export function GetRaidPostsFilterForm(props: GetRaidPostsFilterFormProps) {
  const { initialValues, onSubmit, bosses } = props;

  return (
    <Accordion>
      <AccordionSummary>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={1}
        >
          <Typography variant="h6">FILTER OPTIONS</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {(formProps) => {
            const { handleChange, values } = formProps;
            const gridItemProps = { xs: 12, sm: 5, md: 2, item: true } as const;

            return (
              <Box width={1}>
                <Form>
                  <Grid container justify="space-around">
                    <Grid {...gridItemProps}>
                      <FormikSelect
                        name="server"
                        items={servers}
                        label="Server"
                      />
                    </Grid>
                    <Grid {...gridItemProps}>
                      <MuiDateTimePicker
                        id="minDate"
                        label="Date"
                        value={values.minDate}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid {...gridItemProps}>
                      <TextField
                        label="Author's Name"
                        id="authorName"
                        fullWidth
                        onChange={handleChange}
                        value={values.authorName}
                      />
                    </Grid>
                    <Grid {...gridItemProps}>
                      <FormikSelect
                        name="roleName"
                        items={selectableRoleNames}
                        label="Role's Name"
                      />
                    </Grid>
                    <Grid {...gridItemProps}>
                      <FormikSelect
                        name="roleClass"
                        items={selectableRoleClasses}
                        label="Role's Class"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RaidPostFormRaidBossesOptions
                        bosses={bosses}
                        onChange={handleChange}
                        name="bossesIds"
                        selectedBosses={values.bossesIds}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={1}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Filter
                    </Button>
                  </Box>
                </Form>
              </Box>
            );
          }}
        </Formik>
      </AccordionDetails>
    </Accordion>
  );
}

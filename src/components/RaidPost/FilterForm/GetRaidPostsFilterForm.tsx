import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Form, Formik } from "formik";
import SelectInput from "../../common/inputs/SelectInput";
import { GetPostsQueryParams } from "../../../services/gw2lfg-server/raid-posts/dtos/GetRaidPostsDTO";
import MuiDateTimePicker from "../../common/inputs/MuiDateTimePicker";
import rolesInfo from "../../Role/roles.json";
import { RaidBossDTO } from "../../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidPostFormRaidBossesOptions from "../../RaidBoss/RaidBossesOptions";
import { createStyles } from "@material-ui/core";
import { ShowPostOption } from "./ShowPostOption";

export const ANY = "Any";

export type ShowOption = "all" | "applied" | "accepted";

interface GetRaidPostsFilterFormProps {
  onSubmit: any;
  initialValues: GetPostsQueryParams & { showOption: ShowOption };
  bosses: RaidBossDTO[];
  hideShowOption?: boolean;
}

export function GetRaidPostsFilterForm(props: GetRaidPostsFilterFormProps) {
  const { initialValues, onSubmit, bosses } = props;

  const cssClasses = useStyles();

  const servers = [
    { label: "Any", value: ANY },
    { label: "EU", value: "EU" },
    { label: "NA", value: "NA" },
  ];

  const selectableRoleNames = [...rolesInfo.roles, { name: ANY }].map(
    ({ name }) => ({
      label: name,
      value: name,
    })
  );

  const selectableRoleClasses = [...rolesInfo.classes, { name: ANY }].map(
    ({ name }) => ({
      label: name,
      value: name,
    })
  );

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
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          enableReinitialize={true}
        >
          {(formProps) => {
            const { handleChange, values } = formProps;
            const gridItemProps = {
              xs: 12,
              sm: 5,
              md: 2,
              item: true,
              className: cssClasses.gridItem,
            } as const;

            return (
              <Box width={1}>
                <Form>
                  <Grid container justify="space-around">
                    <Grid {...gridItemProps}>
                      <SelectInput
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
                      <SelectInput
                        name="roleName"
                        items={selectableRoleNames}
                        label="Role's Name"
                      />
                    </Grid>
                    <Grid {...gridItemProps}>
                      <SelectInput
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
                    {!(props.hideShowOption ?? false) && (
                      <Grid item xs={12} className={cssClasses.gridItem}>
                        <ShowPostOption />
                      </Grid>
                    )}
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

/**
 * CSS for GetRaidPostFilterForm component
 */
const useStyles = makeStyles(() =>
  createStyles({
    gridItem: {
      margin: "5px 0",
    },
  })
);

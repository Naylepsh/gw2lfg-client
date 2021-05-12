import { Box, Button, Grid } from "@material-ui/core";
import React from "react";
import RaidPostFormDescription from "../General/RaidPostFormDescription";
import rolesInfo from "../../../Role/roles.json";
import FormikSelect from "../../../common/inputs/FormikSelect";
import ClearIcon from "@material-ui/icons/Clear";

interface RaidPostFormRoleProps {
  formId: string;
  onChange: any;
  handleRoleRemoval: (roleFormId: string) => any;
  descriptionValue: string;
}

/**
 * Renders a single role in a RaidPostForm.
 * For whatever reason Formik doesn't handle providing values for TextFields all that well,
 * thus descriptionValue property is needed
 */
export function RaidPostFormRole(props: RaidPostFormRoleProps) {
  const { onChange, handleRoleRemoval, formId, descriptionValue } = props;

  /**
   * 'any' technically doesn't belong to neither roles nor classes,
   * but it's an useful value accepted by gw2lfg-server
   * and RaidAvatar has its means of rendering it
   */
  const availableRoles = [{ name: "any", portrait: "#" }, ...rolesInfo.roles];
  const availableClasses = [
    { name: "any", portrait: "#" },
    ...rolesInfo.classes,
  ];

  return (
    <Grid container>
      <Grid item xs={12} sm={6} md={2}>
        <Box mr={3} p={3}>
          <FormikSelect
            name={`${formId}.name`}
            items={availableRoles.map((role) => ({
              label: role.name,
              value: role.name,
            }))}
            label="Name"
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={2}>
        <Box mr={3} p={3}>
          <FormikSelect
            name={`${formId}.class`}
            items={availableClasses.map((cl) => ({
              label: cl.name,
              value: cl.name,
            }))}
            label="Class"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box p={3}>
          <RaidPostFormDescription
            id={`${formId}.description`}
            onChange={onChange}
            value={descriptionValue}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={1}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button onClick={() => handleRoleRemoval(formId)}>
            <ClearIcon />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

// Memoised RaidPostFormRole component, improves the performance
export default React.memo(RaidPostFormRole);

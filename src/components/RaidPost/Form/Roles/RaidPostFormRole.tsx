import { Box, Button, Grid } from "@material-ui/core";
import React from "react";
import { RaidPostFormDescription } from "../General/RaidPostFormDescription";
import rolesInfo from "../../../Role/roles.json";
import SelectInput from "../../../common/inputs/SelectInput";
import ClearIcon from "@material-ui/icons/Clear";
import { RoleDTO } from "../../../../services/gw2lfg-server/entities/RoleDTO";

interface RaidPostFormRoleProps {
  formId: string;
  handleRoleRemoval: (roleFormId: string) => any;
  role: RoleDTO;
}

/**
 * Renders a single role in a RaidPostForm.
 * For whatever reason Formik doesn't handle providing values for TextFields all that well,
 * thus descriptionValue property is needed
 */
export function RaidPostFormRole(props: RaidPostFormRoleProps) {
  const { handleRoleRemoval, formId } = props;

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
          <SelectInput
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
          <SelectInput
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
          <RaidPostFormDescription name={`${formId}.description`} />
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
export default React.memo(RaidPostFormRole, (prevProps, nextProps) => {
  return (
    prevProps.role.class === nextProps.role.class &&
    prevProps.role.name === nextProps.role.name &&
    prevProps.role.description === nextProps.role.description
  );
});

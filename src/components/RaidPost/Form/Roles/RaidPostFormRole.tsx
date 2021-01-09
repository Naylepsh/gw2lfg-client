import { Box, Button } from "@material-ui/core";
import React from "react";
import RaidPostFormDescription from "../General/RaidPostFormDescription";
import { roles, classes } from "../../../Role/roles.json";
import FormikSelect from "../../../common/inputs/FormikSelect";
import ClearIcon from "@material-ui/icons/Clear";

interface RaidPostFormRoleProps {
  formId: string;
  onChange: any;
  handleRoleRemoval: (roleFormId: string) => any;
  descriptionValue: string;
}

/* 
Renders a single role in a RaidPostForm.
For whatever reason Formik doesn't handle providing values for TextFields all that well,
thus descriptionValue property is needed
*/
export function RaidPostFormRole(props: RaidPostFormRoleProps) {
  const { onChange, handleRoleRemoval, formId, descriptionValue } = props;

  // 'any' technically doesn't belong to neither roles nor classes,
  // but it's an useful value accepted by gw2lfg-server
  // and RaidAvatar has its means of rendering it
  const availableRoles = [{ name: "any", portrait: "#" }, ...roles];
  const availableClasses = [{ name: "any", portrait: "#" }, ...classes];

  return (
    <Box display="flex" flexDirection="row" padding={3}>
      <Box minWidth={120} mr={3}>
        <FormikSelect
          name={`${formId}.name`}
          items={availableRoles.map((role) => ({
            label: role.name,
            value: role.name,
          }))}
          label="Name"
        />
      </Box>
      <Box minWidth={120} mr={3}>
        <FormikSelect
          name={`${formId}.class`}
          items={availableClasses.map((cl) => ({
            label: cl.name,
            value: cl.name,
          }))}
          label="Class"
        />
      </Box>
      <Box width={1}>
        <RaidPostFormDescription
          id={`${formId}.description`}
          onChange={onChange}
          value={descriptionValue}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button onClick={() => handleRoleRemoval(formId)}>
          <ClearIcon />
        </Button>
      </Box>
    </Box>
  );
}

// Memoised RaidPostFormRole component, improves the performance
export default React.memo(RaidPostFormRole);

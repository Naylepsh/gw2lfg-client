import { Box, Button, Paper, Typography } from "@material-ui/core";
import React from "react";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import { RaidPostFormDescription } from "./RaidPostFormDescription";
import { roles, classes } from "../../Role/roles.json";
import FormikSelect from "../../common/inputs/FormikSelect";

interface RaidPostFormRolesProps {
  roles: RoleDTO[];
  rolesId: string;
  onChange: any;
}

export default function RaidPostFormRoles(props: RaidPostFormRolesProps) {
  const { roles, rolesId, onChange } = props;
  const defaultRole: RoleDTO = { name: "any", class: "any" };
  const handleNewRoleAdditon = () =>
    onChange({ target: { value: [...roles, defaultRole], id: rolesId } });

  return (
    <Box
      my={3}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h6">Roles</Typography>
      <Box component={Paper} width={1}>
        {roles.map((role, key) => (
          <RaidPostFormRole
            key={key}
            role={role}
            formId={`${rolesId}.${key}`}
            onChange={onChange}
          />
        ))}
      </Box>
      <Box mr="auto">
        <Button onClick={handleNewRoleAdditon}>Add new role</Button>
      </Box>
    </Box>
  );
}

interface RaidPostFormRoleProps {
  formId: string;
  role: RoleDTO;
  onChange: any;
}

function RaidPostFormRole(props: RaidPostFormRoleProps) {
  const { role, onChange, formId } = props;
  const availableRoles = [{ name: "any", portrait: "#" }, ...roles];
  const availableClasses = [{ name: "any", portrait: "#" }, ...classes];

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      padding={3}
    >
      <Box minWidth={120}>
        <FormikSelect
          name={`${formId}.name`}
          items={availableRoles.map((role) => ({
            label: role.name,
            value: role.name,
          }))}
          label="Name"
        />
      </Box>
      <Box minWidth={120}>
        <FormikSelect
          name={`${formId}.class`}
          items={availableClasses.map((cl) => ({
            label: cl.name,
            value: cl.name,
          }))}
          label="Name"
        />
      </Box>
      <Box>
        <RaidPostFormDescription
          id={`${formId}.description`}
          onChange={onChange}
        />
      </Box>
      <Box></Box>
    </Box>
  );
}

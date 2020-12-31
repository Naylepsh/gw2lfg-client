import { Box, Button, Paper, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { RoleDTO } from "../../../../services/gw2lfg-server/entities/RoleDTO";
import RaidPostFormRole from "./RaidPostFormRole";

interface RaidPostFormRolesProps {
  roles: RoleDTO[];
  rolesId: string;
  onChange: any;
}

export function RaidPostFormRoles(props: RaidPostFormRolesProps) {
  const { roles, rolesId, onChange } = props;
  const defaultRole: RoleDTO = { name: "any", class: "any" };
  const handleNewRoleAdditon = () =>
    onChange({ target: { value: [...roles, defaultRole], id: rolesId } });
  const handleRoleRemoval = (formId: string) => {
    const [roleKey] = formId.split(".").slice(-1);
    const index = parseInt(roleKey);
    const rolesLeft = [...roles.slice(0, index), ...roles.slice(index + 1)];
    onChange({ target: { value: rolesLeft, id: rolesId } });
  };

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
        {roles.map((_role, key) => (
          <RaidPostFormRole
            key={key}
            formId={`${rolesId}.${key}`}
            onChange={onChange}
            handleRoleRemoval={handleRoleRemoval}
          />
        ))}
      </Box>
      <Box mr="auto" mt={1} mb={3}>
        <Button onClick={handleNewRoleAdditon}>
          <AddIcon />
          Add new role
        </Button>
      </Box>
    </Box>
  );
}

export default React.memo(RaidPostFormRoles);

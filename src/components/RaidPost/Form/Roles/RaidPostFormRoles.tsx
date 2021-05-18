import {
  createStyles,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  makeStyles,
} from "@material-ui/core";
import { Box, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { RoleDTO } from "../../../../services/gw2lfg-server/entities/RoleDTO";
import RaidPostFormRole from "./RaidPostFormRole";

interface RaidPostFormRolesProps {
  roles: RoleDTO[];
  rolesId: string;
  onChange: any;
  errorMessage?: string;
  required?: boolean;
}

/**
 * Renders a dynamic list of roles in a raid post form.
 * Allows creation of up to 10 roles.
 * Roles can be freely added and removed.
 */
export function RaidPostFormRoles(props: RaidPostFormRolesProps) {
  const maxNumberOfRoles = 10;
  const { roles, rolesId, onChange, errorMessage, required } = props;
  const defaultRole: RoleDTO = { name: "any", class: "any" };

  const classes = useStyles();

  // adds a default role to the list of roles in the associated form
  const addNewRole = () =>
    onChange({ target: { value: [...roles, defaultRole], id: rolesId } });

  // removes a role from the lists of roles in the associated form
  const removeRoleFromTheList = (formId: string) => {
    const [roleKey] = formId.split(".").slice(-1);
    const index = parseInt(roleKey);
    const rolesLeft = [...roles.slice(0, index), ...roles.slice(index + 1)];
    onChange({ target: { value: rolesLeft, id: rolesId } });
  };

  return (
    <FormControl
      required={required ?? false}
      error={!!errorMessage}
      className={classes.formControl}
    >
      <FormLabel component="legend">Roles</FormLabel>
      <FormHelperText>{errorMessage}</FormHelperText>
      <FormGroup className={classes.formGroup}>
        {roles.map((role, key) => (
          <RaidPostFormRole
            key={key}
            formId={`${rolesId}.${key}`}
            handleRoleRemoval={removeRoleFromTheList}
            role={role}
          />
        ))}
      </FormGroup>
      {roles.length < maxNumberOfRoles && (
        <Box mr="auto" mt={1} mb={3}>
          <Button onClick={addNewRole}>
            <AddIcon />
            Add new role
          </Button>
        </Box>
      )}
    </FormControl>
  );
}

// Memoised RaidPostFormRoles component, improves the performance
export default React.memo(RaidPostFormRoles);

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "30px",
    },
    formGroup: {
      width: "100%",
    },
  })
);

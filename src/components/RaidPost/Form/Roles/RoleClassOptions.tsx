import React from "react";
import { classes } from "../../../Role/roles.json";
import RoleOptions from "./RoleOptions";

interface RoleClassOptionsProps {
  formId: string;
}

export default function RoleClassOptions(props: RoleClassOptionsProps) {
  const availableClasses = [{ name: "any", portrait: "#" }, ...classes];

  return (
    <RoleOptions
      formId={`${props.formId}.class`}
      label="Class"
      items={availableClasses.map((cl) => ({ label: cl.name, value: cl.name }))}
    />
  );
}

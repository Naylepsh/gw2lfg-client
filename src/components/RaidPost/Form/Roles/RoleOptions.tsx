import React from "react";
import FormikSelect from "../../../common/inputs/FormikSelect";

interface RoleOptionsProps {
  formId: string;
  label: string;
  items: { label: string; value: string }[];
}

export default function RoleOptions(props: RoleOptionsProps) {
  const { formId, items, label } = props;

  return <FormikSelect name={formId} items={items} label={label} />;
}

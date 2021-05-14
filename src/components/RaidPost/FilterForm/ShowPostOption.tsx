import React from "react";
import { ShowOption } from "./GetRaidPostsFilterForm";
import { RadioInput } from "../../common/inputs/RadioInput";

export function ShowPostOption() {
  const radioParams: { value: ShowOption; label: string }[] = [
    { value: "all", label: "Show all" },
    { value: "applied", label: "Show only those I've applied to" },
    { value: "accepted", label: "Show only those I've joined" },
  ];

  return (
    <RadioInput items={radioParams} name="showOption" title="Show Posts" />
  );
}

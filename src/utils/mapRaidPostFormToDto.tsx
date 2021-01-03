import { RaidPostFormValues } from "../components/RaidPost/Form/RaidPostFormValues";

export function mapRaidPostFormToDto(values: RaidPostFormValues) {
  const formItems = values.requirementsProps.itemsProps;
  const itemsProps = Object.keys(formItems).map((name) => ({
    name,
    quantity: formItems[name],
  }));
  const bossesIds = values.selectedBosses.map((id) => parseInt(id));
  const raidPost = {
    ...values,
    bossesIds,
    requirementsProps: { itemsProps },
  };

  return raidPost;
}

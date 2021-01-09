import { RaidPostFormValues } from "../components/RaidPost/Form/RaidPostFormValues";

/* 
Maps the raid post form values into raid post dto ready to be sent to gw2lfg-server
*/
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

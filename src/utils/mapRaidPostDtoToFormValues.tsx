import { RaidPostFormValues } from "../components/RaidPost/Form/RaidPostFormValues";
import { RaidPostDTO } from "../services/gw2lfg-server/entities/RaidPostDTO";

export function mapRaidPostDtoToFormValues(
  dto: RaidPostDTO
): RaidPostFormValues {
  const items = dto.requirements.items;
  const requirementsProps = {
    itemsProps: Object.fromEntries(
      items.map((item) => [item.name, item.quantity])
    ),
  };

  return {
    server: dto.server,
    date: dto.date,
    description: dto.description,
    selectedBosses: dto.bosses.map((boss) => boss.id.toString()),
    requirementsProps,
    rolesProps: dto.roles,
  };
}

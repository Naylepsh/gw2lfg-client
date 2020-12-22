import { useQuery } from "react-query";
import { getRaidBosses } from "../../../services/gw2lfg-server/raid-bosses/getRaidBossesService";

export function useGetRaidBossesQuery() {
  return useQuery("getRaidBosses", () => getRaidBosses());
}

import { useQuery } from "react-query";
import getRaidBosses from "../../../services/gw2lfg-server/raid-bosses/getRaidBossesService";

/* 
Since there's is no way to externally change bosses,
the query's value will always stay the same,
thus no reason to define raidBosses query invalidation
*/
export function useGetRaidBossesQuery() {
  return useQuery(getRaidBossesQueryKey, () => getRaidBosses());
}

const getRaidBossesQueryKey = "getRaidBosses";

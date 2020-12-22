import { httpGet } from "../../http/getHttpService";
import { gw2lfgUrl } from "../constants";
import { RaidBossDTO } from "../entities/RaidBossDTO";

const raidBossUrl = `${gw2lfgUrl}/raid-bosses`;

export async function getRaidBosses(take: number = 40) {
  const url = `${raidBossUrl}?take=${take}`;
  const { data } = await httpGet<{ data: RaidBossDTO[] }>(url);
  return data;
}

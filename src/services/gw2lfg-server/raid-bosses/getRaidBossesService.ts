import { httpGet } from "../../http/getHttpService";
import { gw2lfgUrl } from "../constants";
import { RaidBossDTO } from "../entities/RaidBossDTO";

// sends GET /raid-bosses request to gw2lfg-server
export async function getRaidBosses() {
  const { data } = await httpGet<{ data: RaidBossDTO[] }>(raidBossesUrl);

  return data;
}

const raidBossesUrl = `${gw2lfgUrl}/raid-bosses`;

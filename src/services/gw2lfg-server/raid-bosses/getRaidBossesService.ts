import { httpGet } from "../../http/getHttpService";
import { gw2lfgUrl } from "../constants";
import { RaidBossDTO } from "../entities/RaidBossDTO";

interface GetRaidBossesDTO {
  take?: number;
}

// sends GET /raid-bosses request to gw2lfg-server
export async function getRaidBosses(dto?: GetRaidBossesDTO) {
  // assign default values if dto is lacking following properties
  const defaultNumberToTake = 42;
  const take = dto?.take ?? defaultNumberToTake;

  const url = `${raidBossesUrl}?take=${take}`;

  const { data } = await httpGet<{ data: RaidBossDTO[] }>(url);
  return data;
}

const raidBossesUrl = `${gw2lfgUrl}/raid-bosses`;

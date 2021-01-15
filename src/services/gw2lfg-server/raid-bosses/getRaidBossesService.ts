import { axiosHttpGetAdapter } from "../../http/get/axiosHttpGetAdapter";
import { HttpGet } from "../../http/get/httpGetType";
import { gw2lfgUrl } from "../constants";
import { RaidBossDTO } from "../entities/RaidBossDTO";

/* 
Sends GET /raid-bosses request to gw2lfg-server
*/
export function getRaidBosses(httpGet: HttpGet) {
  return async function () {
    const { data } = await httpGet<{ data: RaidBossDTO[] }>(raidBossesUrl);

    return data;
  };
}

/*
Function with axios adapter injected.
*/
export default getRaidBosses(axiosHttpGetAdapter);

const raidBossesUrl = `${gw2lfgUrl}/raid-bosses`;

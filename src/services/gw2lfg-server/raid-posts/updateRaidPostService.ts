import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { httpPut } from "../../http/putHttpService";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { RaidPostDTO } from "../entities/RaidPostDTO";
import { raidPostsUrl } from "./constants";
import { SaveRaidPostDTO } from "./SaveRaidPostDTO";

export const getRaidPostUrl = (id: string) => {
  return `${raidPostsUrl}/${id}`;
};

interface UpdateRaidPostDTO extends SaveRaidPostDTO {
  id: string;
}

export async function updateRaidPost({
  id,
  ...raidPostDto
}: UpdateRaidPostDTO) {
  raidPostDto.rolesProps = raidPostDto.rolesProps ?? [];
  raidPostDto.requirementsProps.itemsProps =
    raidPostDto.requirementsProps.itemsProps ?? [];

  const token = getAccessToken();
  const headers = createGw2lfgHeaders(token);

  const { data } = await httpPut<SaveRaidPostDTO, { data: RaidPostDTO }>(
    getRaidPostUrl(id),
    raidPostDto,
    { headers }
  );

  return data;
}

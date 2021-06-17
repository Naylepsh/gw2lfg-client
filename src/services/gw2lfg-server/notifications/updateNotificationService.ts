import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { axiosHttpPatchAdapter } from "../../http/patch/axiosHttpPatchAdapter";
import { HttpPatch } from "../../http/patch/HttpPatchType";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { JoinRequestDTO } from "../entities/joinRequestDTO";
import { notificationsUrl } from "./constants";
import { UpdateNotificationDTO } from "./dtos/UpdateNotificationDTO";

/**
 * Sends PATCH /notifications/:id request to gw2lfg-server
 */
export function updateNotification(httpPatch: HttpPatch) {
  return async function (dto: UpdateNotificationDTO) {
    const updateNotificationUrl = `${notificationsUrl}/${dto.id}`;

    // Access token is required
    const token = getAccessToken();
    const headers = createGw2lfgHeaders(token);

    const { data } = await httpPatch<
      UpdateNotificationDTO,
      { data: JoinRequestDTO }
    >(updateNotificationUrl, dto, { headers });

    return data;
  };
}

/**
 * Injected axios adapter
 */
export default updateNotification(axiosHttpPatchAdapter);

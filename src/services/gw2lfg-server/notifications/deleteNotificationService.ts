import { getAccessToken } from "../../../utils/auth/getAccessToken";
import { axiosHttpDeleteAdapter } from "../../http/delete/axiosHttpDeleteAdapter";
import { HttpDelete } from "../../http/delete/httpDeleteType";
import { createGw2lfgHeaders } from "../createGw2lfgHeaders";
import { notificationsUrl } from "./constants";
import { DeleteNotificationDTO } from "./dtos/deleteNotificationDTO";

/**
 * Sends DELETE /notifications/:id request to gw2lfg-server
 */
export function deleteNotification(httpDelete: HttpDelete) {
  return async function (dto: DeleteNotificationDTO) {
    // Access token is required
    const token = getAccessToken();
    const headers = createGw2lfgHeaders(token);

    const { data, error } = await httpDelete<{}>(
      `${deleteNotificationUrl}/${dto.id}`,
      { headers }
    );

    return { data, error };
  };
}

/**
 * Function with axios adapter injected.
 */
export default deleteNotification(axiosHttpDeleteAdapter);

export const deleteNotificationUrl = notificationsUrl;

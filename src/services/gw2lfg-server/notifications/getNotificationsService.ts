import { axiosHttpGetAdapter } from "../../http/get/axiosHttpGetAdapter";
import { HttpGet } from "../../http/get/httpGetType";
import { createPaginationQuery } from "../createPaginationQuery";
import { NotificationDTO } from "../entities/NotificationDTO";
import { notificationsUrl } from "./constants";
import {
  GetNotificationsDTO,
  GetNotificationsQueryParams,
} from "./dtos/GetNotificationsDTO";

/**
 * Sends GET /notifications request to gw2lfg-server
 */
export function getNotifications(httpGet: HttpGet) {
  return async function (dto: GetNotificationsDTO) {
    const query = createQuery(dto);
    const url = `${getNotificationsUrl}?${query}`;

    const { data: notifications, hasMore } = await httpGet<{
      data: NotificationDTO[];
      hasMore: boolean;
    }>(url);

    return { notifications, hasMore };
  };
}

function createQuery(dto: GetNotificationsDTO) {
  return [createPaginationQuery(dto.page), createParamQuery(dto.params)]
    .filter((q) => !!q)
    .join("&");
}

function createParamQuery(params: GetNotificationsQueryParams) {
  const query = [];
  for (const param in params) {
    const value = mapToQueryValue(params[param]);
    query.push(`${param}=${value}`);
  }

  return query.join("&");
}

function mapToQueryValue(value: any) {
  if (Array.isArray(value)) {
    value = value.join(",");
  }

  return value;
}

export default getNotifications(axiosHttpGetAdapter);

export const getNotificationsUrl = notificationsUrl;

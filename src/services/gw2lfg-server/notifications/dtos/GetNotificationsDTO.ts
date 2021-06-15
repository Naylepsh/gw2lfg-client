export interface GetNotificationsDTO {
  page: number;
  params: GetNotificationsQueryParams;
}

export interface GetNotificationsQueryParams {
  recipent: string;
  seen?: boolean;
}

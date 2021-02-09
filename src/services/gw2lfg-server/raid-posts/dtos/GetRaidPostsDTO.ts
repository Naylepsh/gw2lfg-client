export interface GetRaidPostsDTO {
  page: number;
  params: GetPostsQueryParams;
}

export interface GetPostsQueryParams {
  server?: string;
}

export interface GetRaidPostsDTO {
  page: number;
  params: GetPostsQueryParams;
}

export interface GetPostsQueryParams {
  server?: string;
  authorName?: string;
  minDate?: string;
  roleName?: string;
  roleClass?: string;
  bossesIds?: string[];
  joinRequestStatus?: string;
  joinRequestAuthorId?: string;
}

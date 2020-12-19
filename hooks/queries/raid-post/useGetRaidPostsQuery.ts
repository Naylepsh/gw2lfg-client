import { useQuery } from "react-query";
import { getRaidPosts } from "../../../services/gw2lfg-server/raid-post/getRaidPostsService";

export function useGetRaidPostsQuery(page: number) {
  return useQuery(['getRaidPostsOnPage', page], () =>
     getRaidPosts({ page })
  );
}
import dynamic from "next/dynamic";

const UserRaidPostsWithoutSSR = dynamic(
  () => import("../../../src/components/User/UserRaidPosts"),
  { ssr: false }
);

export default function UserRaidPostsPage() {
  return <UserRaidPostsWithoutSSR />;
}

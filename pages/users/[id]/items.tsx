import dynamic from "next/dynamic";

const UserItemsWithoutSSR = dynamic(
  () => import("../../../src/components/User/UserItems"),
  { ssr: false }
);

export default function UserItemsPage() {
  return <UserItemsWithoutSSR />;
}

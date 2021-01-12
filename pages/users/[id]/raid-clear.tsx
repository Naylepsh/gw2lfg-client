import dynamic from "next/dynamic";

const UserRaidClearWithoutSSR = dynamic(
  () => import("../../../src/components/User/UserRaidClear"),
  { ssr: false }
);

export default function UserRaidClearPage() {
  return <UserRaidClearWithoutSSR />;
}
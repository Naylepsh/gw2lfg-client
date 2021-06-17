import dynamic from "next/dynamic";

const UserNotificationsWithoutSSR = dynamic(
  () => import("../../src/components/User/UserNotifications"),
  { ssr: false }
);

export default function UserItemsPage() {
  return <UserNotificationsWithoutSSR />;
}

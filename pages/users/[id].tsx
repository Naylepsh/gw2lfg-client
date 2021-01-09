import dynamic from "next/dynamic";

const UserProfileWithoutSSR = dynamic(
  () => import("../../src/components/User/UserProfile"),
  { ssr: false }
);

export default function ShowUserProfile() {
  return <UserProfileWithoutSSR />;
}

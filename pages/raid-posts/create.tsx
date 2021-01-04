import dynamic from "next/dynamic";

const CreateRaidPostWithoutSSR = dynamic(
  () => import("../../src/components/RaidPost/CreateRaidPost"),
  { ssr: false }
);

export default function CreateRaidPostPage() {
  return <CreateRaidPostWithoutSSR />;
}

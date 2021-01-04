import dynamic from "next/dynamic";

const EditPageWithoutSSR = dynamic(
  () => import("../../../src/components/RaidPost/EditRaidPost"),
  { ssr: false }
);

export default function EditRaidPostPage() {
  return <EditPageWithoutSSR />;
}

import dynamic from "next/dynamic";

const GetPageWithoutSSR = dynamic(
  () => import("../../../src/components/RaidPost/GetRaidPost"),
  { ssr: false }
);

export default function EditRaidPostPage() {
  return <GetPageWithoutSSR />;
}

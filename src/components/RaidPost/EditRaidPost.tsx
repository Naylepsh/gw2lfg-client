import { useRouter } from "next/router";
import React from "react";
import Loading from "../Loading/Loading";
import RaidPostForm from "./Form/RaidPostForm";
import { RaidPostFormValues } from "./Form/RaidPostFormValues";
import { useGetRaidBossesQuery } from "../../hooks/queries/raid-bosses/useGetRaidBossesQuery";
import { useGetRaidPostQuery } from "../../hooks/queries/raid-posts/useGetRaidPostQuery";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { mapRaidPostDtoToFormValues } from "../../utils/mapRaidPostDtoToFormValues";

export default function EditRaidPost() {
  const router = useRouter();
  const { id } = router.query;
  console.log({ id });

  const { isAuthenticating } = useIsAuthenticated();
  const {
    isLoading: isRaidPostLoading,
    isError: getRaidPostFailed,
    data: raidPost,
  } = useGetRaidPostQuery(id as string);
  const {
    isLoading: areRaidBossesLoading,
    isError: getRaidBossesFailed,
    data: bosses,
  } = useGetRaidBossesQuery();

  const handleFormSubmit = async (values: RaidPostFormValues, {}) => {
    try {
      console.log(values);
    } catch (err) {
      console.error(err);
    }
  };

  const isLoading =
    isAuthenticating || isRaidPostLoading || areRaidBossesLoading;
  const hasFailed = getRaidPostFailed || getRaidBossesFailed;
  if (isLoading) return <Loading size="large" />;
  if (hasFailed) return <div>Encountered error...</div>;

  const initialValues = mapRaidPostDtoToFormValues(raidPost);

  return (
    <RaidPostForm
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      bosses={bosses}
    />
  );
}

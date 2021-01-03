import React from "react";
import RaidPostForm from "../../src/components/RaidPost/Form/RaidPostForm";
import { useIsAuthenticated } from "../../src/hooks/useIsAuthenticated";
import Loading from "../../src/components/Loading/Loading";
import { RoleDTO } from "../../src/services/gw2lfg-server/entities/RoleDTO";
import { useRouter } from "next/router";
import { useCreateRaidPostMutation } from "../../src/hooks/mutations/raid-posts/useCreateRaidPostMutation";
import { useGetRaidBossesQuery } from "../../src/hooks/queries/raid-bosses/useGetRaidBossesQuery";
import {
  RaidPostFormValues,
  RequirementsProps,
} from "../../src/components/RaidPost/Form/RaidPostFormValues";
import { mapRaidPostFormToDto } from "../../src/utils/mapRaidPostFormToDto";

export default function CreateNewPost() {
  const { isAuthenticating } = useIsAuthenticated();

  const { isLoading, isError, data: bosses } = useGetRaidBossesQuery();

  const [createPost] = useCreateRaidPostMutation();
  const router = useRouter();
  const handleFormSubmit = async (values: RaidPostFormValues, {}) => {
    const raidPost = mapRaidPostFormToDto(values);
    const res = await createPost(raidPost);
    console.log(res);
    router.push("/raid-posts");
  };

  const initialValues: RaidPostFormValues = {
    server: "",
    date: "",
    description: "",
    selectedBosses: [] as string[],
    requirementsProps: {} as RequirementsProps,
    rolesProps: [] as RoleDTO[],
  };

  if (isAuthenticating) return <Loading size="large" />;
  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error...</div>;

  return (
    <RaidPostForm
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      bosses={bosses}
    />
  );
}

import { useRouter } from "next/router";
import React from "react";
import Loading from "../common/Loading/Loading";
import RaidPostForm from "./Form/RaidPostForm";
import {
  RaidPostFormValues,
  RequirementsProps,
} from "./Form/RaidPostFormValues";
import { useCreateRaidPostMutation } from "../../hooks/mutations/raid-posts/useCreateRaidPostMutation";
import { useGetRaidBossesQuery } from "../../hooks/queries/raid-bosses/useGetRaidBossesQuery";
import { invalidateGetRaidPostsQueries } from "../../hooks/queries/raid-posts/useGetRaidPostsQuery";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { RoleDTO } from "../../services/gw2lfg-server/entities/RoleDTO";
import { mapRaidPostFormToDto } from "../../utils/mapRaidPostFormToDto";

/*
Renders raid post form that allows creation of new posts.
Sets initial form values and submit handler.
User has to be authenticated to use.
*/
export default function CreateRaidPost() {
  const { isAuthenticating } = useIsAuthenticated();

  const { isLoading, isError, data: bosses } = useGetRaidBossesQuery();

  const [createPost] = useCreateRaidPostMutation();
  const router = useRouter();
  const handleFormSubmit = async (values: RaidPostFormValues, {}) => {
    try {
      const raidPost = mapRaidPostFormToDto(values);
      const res = await createPost(raidPost);
      invalidateGetRaidPostsQueries();
      router.push("/raid-posts");
    } catch (err) {
      console.error(err);
    }
  };

  const initialValues: RaidPostFormValues = {
    server: "",
    date: "",
    description: "",
    selectedBosses: [] as string[],
    requirementsProps: { itemsProps: {} } as RequirementsProps,
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

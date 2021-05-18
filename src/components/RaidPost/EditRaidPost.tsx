import { useRouter } from "next/router";
import React from "react";
import Loading from "../common/Loading/Loading";
import RaidPostForm from "./Form/RaidPostForm";
import { RaidPostFormValues } from "./Form/RaidPostFormValues";
import { useGetRaidBossesQuery } from "../../hooks/queries/raid-bosses/useGetRaidBossesQuery";
import { useGetRaidPostQuery } from "../../hooks/queries/raid-posts/useGetRaidPostQuery";
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";
import { mapRaidPostDtoToFormValues } from "../../utils/mapRaidPostDtoToFormValues";
import { useUpdateRaidPostMutation } from "../../hooks/mutations/raid-posts/useUpdateRaidPostMutation";
import { mapRaidPostFormToDto } from "../../utils/mapRaidPostFormToDto";
import { invalidateGetRaidPostsQueries } from "../../hooks/queries/raid-posts/useGetRaidPostsQuery";
import { mapGw2lfgServer400ErrorsToErrorMap } from "../../utils/mapGw2lfgServer400ErrorsToErrorMap";

/**
 * Renders raid post form that allows editing of existing posts.
 * Gets the raid post of the id given by query and sets initial form values and submit handler.
 * User has to be authenticated to use.
 */
export default function EditRaidPost() {
  const router = useRouter();
  const { id } = router.query;

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
  const [updatePost] = useUpdateRaidPostMutation();

  const handleFormSubmit = async (
    values: RaidPostFormValues,
    { setErrors }
  ) => {
    const raidPost = mapRaidPostFormToDto(values);
    const { error } = await updatePost({ id: id as string, ...raidPost });
    if (!error) {
      invalidateGetRaidPostsQueries();
      router.push("/raid-posts");
    } else {
      if (error.status === 400 && error.data.errors) {
        setErrors(mapGw2lfgServer400ErrorsToErrorMap(error.data.errors));
      } else {
        console.log(error);
      }
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
      title="Edit Post Form"
    />
  );
}

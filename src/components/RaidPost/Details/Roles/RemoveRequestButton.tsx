import React from "react";
import LoadingButton from "../../../common/buttons/LoadingButton";
import { useDeleteJoinRequestMutation } from "../../../../hooks/mutations/join-requests/useDeleteJoinRequestMutation";
import { invalidateGetJoinRequestsQueries } from "../../../../hooks/queries/join-requests/useGetJoinRequestsQuery";

interface CancelRequestButtonProps {
  roleIdToCancel: number;
  postId: number;
  label: string;
}

export function RemoveRequestButton(props: CancelRequestButtonProps) {
  const { roleIdToCancel, postId, label } = props;
  const [cancelJoinRequest] = useDeleteJoinRequestMutation();

  return (
    <LoadingButton
      color="primary"
      variant="contained"
      onClick={async () => {
        await cancelJoinRequest({ id: roleIdToCancel });
        invalidateGetJoinRequestsQueries({ postId });
      }}
    >
      {label}
    </LoadingButton>
  );
}

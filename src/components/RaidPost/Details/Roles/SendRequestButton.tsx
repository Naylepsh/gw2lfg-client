import React, { useState } from "react";
import { useCreateJoinRequestMutation } from "../../../../hooks/mutations/join-requests/useCreateJoinRequestMutation";
import LoadingButton from "../../../common/buttons/LoadingButton";
import { invalidateGetJoinRequestsQueries } from "../../../../hooks/queries/join-requests/useGetJoinRequestsQuery";

interface SendRequestButtonProps {
  canUserClickOnJoin: boolean;
  postId: number;
  roleId: number;
}

export function SendRequestButton(props: SendRequestButtonProps) {
  const { canUserClickOnJoin, postId, roleId } = props;
  const [requestError, setRequestError] = useState(false);
  const [joinButtonText, setJoinButtonText] = useState("JOIN");
  const [createJoinRequest] = useCreateJoinRequestMutation();

  return (
    <LoadingButton
      color="primary"
      variant="contained"
      disabled={!canUserClickOnJoin || requestError}
      onClick={async () => {
        const { error } = await createJoinRequest({
          postId,
          roleId,
        });
        if (error) {
          setRequestError(true);
          if (error.status === 409) {
            setJoinButtonText("CAN TAKE ONLY ONE ROLE");
          } else {
            setJoinButtonText("REQUIREMENTS UNSATISFIED");
          }
        } else {
          invalidateGetJoinRequestsQueries({ postId });
        }
      }}
    >
      {joinButtonText}
    </LoadingButton>
  );
}

import { AccordionDetails, Box, Button, Grid } from "@material-ui/core";
import React from "react";
import { RaidPostDTO } from "../../../services/gw2lfg-server/entities/RaidPostDTO";
import { RaidPostRolesDetails } from "./RaidPostRolesDetails";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMeQuery } from "../../../hooks/queries/users/useMeQuery";
import { useDeleteRaidPostMutation } from "../../../hooks/mutations/raid-posts/useDeleteRaidPostMutation";
import { invalidateGetRaidPostQueries } from "../../../hooks/queries/raid-posts/useGetRaidPostQuery";
import { invalidateGetRaidPostsQueries } from "../../../hooks/queries/raid-posts/useGetRaidPostsQuery";
import { useRouter } from "next/router";

interface RaidPostDetailsProps {
  raidPost: RaidPostDTO;
}

/* 
Renders description and role of a given raid post.
Displays edit / delete buttons if user is authorized to access those routes.
*/
export default function RaidPostDetails(props: RaidPostDetailsProps) {
  const { raidPost } = props;

  // check if client is the post's author
  const { isError, isLoading, data: me } = useMeQuery();
  const isAuthor = isError || isLoading ? false : raidPost.author.id === me.id;

  // handling post deletion request
  const [deletePost] = useDeleteRaidPostMutation();
  const router = useRouter();
  const handlePostDeletion = async () => {
    const { error } = await deletePost({ id: raidPost.id });
    if (error) {
      console.error(error);
    } else {
      // those are seperate query results and both need to be invalidated
      invalidateGetRaidPostQueries(raidPost.id.toString());
      invalidateGetRaidPostsQueries();
      // refresh the page
      router.reload();
    }
  };

  return (
    <AccordionDetails>
      <Grid container direction="column">
        <Box mb={3}>{raidPost.description}</Box>
        <RaidPostRolesDetails
          postId={raidPost.id}
          roles={raidPost.roles}
          canUserJoin={raidPost.userMeetsRequirements}
        />
        {isAuthor && (
          <Box display="flex" flexDirection="row" mt={2} ml="auto">
            <Box mr={2}>
              <Button
                href={`/raid-posts/${raidPost.id}/edit`}
                variant="contained"
                color="primary"
              >
                <EditIcon />
                Edit
              </Button>
            </Box>
            <Box>
              <Button
                onClick={handlePostDeletion}
                variant="contained"
                color="primary"
              >
                <DeleteIcon />
                Delete
              </Button>
            </Box>
          </Box>
        )}
      </Grid>
    </AccordionDetails>
  );
}

import { AccordionDetails, Box, Button, Grid } from "@material-ui/core";
import React from "react";
import { RaidPostDTO } from "../../../services/gw2lfg-server/entities/RaidPostDTO";
import { RaidPostRolesDetails } from "./RaidPostRolesDetails";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useMeQuery } from "../../../hooks/queries/users/useMeQuery";

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
              <Button href="#" variant="contained" color="primary">
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

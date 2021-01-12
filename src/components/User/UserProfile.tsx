import {
  Paper,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useGetUserProfileQuery } from "../../hooks/queries/users/useGetUserProfileQuery";
import Loading from "../common/Loading/Loading";

/*
Renders profile of a user with id given by the route query,
For example, if rendering page /users/123, then will render profile of user with id 123
*/
export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;

  const classes = useStyles();

  const { isLoading, isError, data } = useGetUserProfileQuery(id as string);

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error...</div>;

  return (
    <Container maxWidth="sm" component={Paper}>
      <Box my={3} py={3}>
        <TableContainer>
          <Table aria-label="user profile">
            <TableBody>
              <TableRow>
                <TableCell>Username:</TableCell>
                <TableCell align="right">
                  <Box fontWeight="bold">{data.user.username}</Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Account name:</TableCell>
                <TableCell align="right">
                  <Box fontWeight="bold">{data.account.name}</Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <List className={classes.list}>
          <ListItem button>
            <ListItemText
              className={classes.itemText}
              primary={`Browse ${data.user.username}'s items`}
              onClick={() => router.push(`/users/${id}/items`)}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              className={classes.itemText}
              primary={`Browse ${data.user.username}'s raid posts`}
              onClick={() => router.push(`/users/${id}/raid-posts`)}
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              className={classes.itemText}
              primary={`Browse ${data.user.username}'s raid clear`}
              onClick={() => router.push(`/users/${id}/raid-clear`)}
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}

// CSS for UserProfile component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    itemText: {
      "& span, & svg": {
        fontSize: "inherit",
      },
    },
  })
);

import {
  Paper,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Box,
  Container,
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

  const { isLoading, isError, data } = useGetUserProfileQuery(id as string);

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error...</div>;

  return (
    <Container maxWidth="sm">
      <Box my={3}>
        <TableContainer component={Paper}>
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
      </Box>
    </Container>
  );
}

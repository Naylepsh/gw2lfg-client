import {
  Paper,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { useGetUserProfileQuery } from "../../hooks/queries/users/useGetUserProfileQuery";
import Loading from "../common/Loading/Loading";
import Gw2ItemAvatar from "../Gw2Item/Gw2ItemAvatar";

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
    <Container maxWidth="sm" component={Paper}>
      <Box mt={3} pt={3}>
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
      </Box>
      <Box pb={3}>
        <Accordion>
          <AccordionSummary>Items:</AccordionSummary>
          <AccordionDetails>
            <Box
              display="flex"
              flexDirection="row"
              width="100%"
              flexWrap="wrap"
              justifyContent="space-around"
            >
              {data.items.map((item) => (
                <Box
                  key={item.name}
                  display="flex"
                  flexDirection="row"
                  flexWrap="wrap"
                  m={3}
                >
                  <Gw2ItemAvatar name={item.name} />
                  <Box fontSize={24} ml={1}>
                    x{item.quantity}
                  </Box>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}

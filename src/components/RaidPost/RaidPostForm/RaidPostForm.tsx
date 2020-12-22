import { Box } from "@material-ui/core";
import { Container, Paper, Typography } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";

interface RaidPostFormProps {}

export default function RaidPostForm(props: RaidPostFormProps) {
  return (
    <Container component={Paper}>
      <Box
        my={3}
        p={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4">Create Raid Post</Typography>
        <Formik
          onSubmit={() => console.log("!")}
          initialValues={{ x: "hello" }}
        >
          {(formProps) => {
            return (
              <React.Fragment>
                <RaidPostFormDescription />
                <RaidPostFormRaidBossesOptions />
                <RaidPostFormRequirementsOptions />
                <RaidPostFormRoles />
              </React.Fragment>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}

function RaidPostFormDescription() {
  return <div>desc...</div>;
}

function RaidPostFormRaidBossesOptions() {
  return <div>raid bosses...</div>;
}

function RaidPostFormRequirementsOptions() {
  return <div>requirements...</div>;
}

function RaidPostFormRoles() {
  return <div>roles...</div>;
}

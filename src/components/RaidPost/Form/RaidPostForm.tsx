import { Box, Button, Container, Paper, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useCreateRaidPostMutation } from "../../../hooks/mutations/raid-posts/useCreateRaidPostMutation";
import { useGetRaidBossesQuery } from "../../../hooks/queries/raid-bosses/useGetRaidBossesQuery";
import { RoleDTO } from "../../../services/gw2lfg-server/entities/RoleDTO";
import Loading from "../../Loading/Loading";
import RaidPostFormGeneral from "./General/RaidPostFormGeneral";
import RaidPostFormRaidBossesOptions from "./RaidBosses/RaidPostFormRaidBossesOptions";
import RaidPostFormRequirementsOptions from "./Requirements/RaidPostFormRequirementsOptions";
import RaidPostFormRoles from "./Roles/RaidPostFormRoles";

interface RaidPostFormProps {}

interface RequirementsProps {
  itemsProps: RequirementsItemsProps;
}

interface RequirementsItemsProps {
  [key: string]: number;
}

export default function RaidPostForm(props: RaidPostFormProps) {
  const initialValues: RaidPostFormValues = {
    server: "",
    date: "",
    description: "",
    selectedBosses: [] as string[],
    requirementsProps: {} as RequirementsProps,
    rolesProps: [] as RoleDTO[],
  };
  const [createPost] = useCreateRaidPostMutation();
  const router = useRouter();
  const { isLoading, isError, data: bosses } = useGetRaidBossesQuery();

  if (isLoading) return <Loading size="large" />;
  if (isError) return <div>Encountered error...</div>;

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
          onSubmit={async (values, {}) => {
            const raidPost = mapRaidPostFormToDto(values);
            await createPost(raidPost);
            router.push("/raid-posts");
          }}
          initialValues={initialValues}
        >
          {(formProps) => {
            const { handleChange, values } = formProps;
            return (
              <Form>
                <RaidPostFormGeneral
                  serverId="server"
                  dateId="date"
                  dateSelected={values.date}
                  descriptionId="description"
                  onChange={handleChange}
                />
                <RaidPostFormRaidBossesOptions
                  bosses={bosses}
                  onChange={handleChange}
                  name="selectedBosses"
                  selectedBosses={values.selectedBosses}
                />
                <RaidPostFormRequirementsOptions
                  requirementsId="requirementsProps"
                  itemsId="itemsProps"
                  onChange={handleChange}
                />
                <RaidPostFormRoles
                  roles={values.rolesProps}
                  rolesId="rolesProps"
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}

interface RaidPostFormValues {
  server: string;
  date: string;
  description: string;
  selectedBosses: string[];
  requirementsProps: RequirementsProps;
  rolesProps: RoleDTO[];
}

function mapRaidPostFormToDto(values: RaidPostFormValues) {
  const formItems = values.requirementsProps.itemsProps;
  const itemsProps = Object.keys(formItems).map((name) => ({
    name,
    quantity: formItems[name],
  }));
  const bossesIds = values.selectedBosses.map((id) => parseInt(id));
  const raidPost = {
    ...values,
    bossesIds,
    requirementsProps: { itemsProps },
  };

  return raidPost;
}

import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Checkbox,
  Badge,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import { useGetRaidBossesQuery } from "../../../hooks/queries/raid-bosses/useGetRaidBossesQuery";
import { RaidBossDTO } from "../../../services/gw2lfg-server/entities/RaidBossDTO";
import RaidBossAvatar from "../../RaidBoss/RaidBossAvatar";

interface RaidPostFormProps {}

export default function RaidPostForm(props: RaidPostFormProps) {
  const initialValues = { description: "", selectedBosses: [] as string[] };

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
          onSubmit={(values, {}) => console.log(values)}
          initialValues={initialValues}
        >
          {(formProps) => {
            const { handleChange, values } = formProps;
            return (
              <Form>
                <RaidPostFormDescription
                  id="description"
                  onChange={handleChange}
                />
                <RaidPostFormRaidBossesOptions
                  onChange={handleChange}
                  name="selectedBosses"
                  selectedBosses={values.selectedBosses}
                />
                <RaidPostFormRequirementsOptions />
                <RaidPostFormRoles />
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

interface RaidPostFormDescriptionProps {
  id: string;
  onChange: any;
}

function RaidPostFormDescription(props: RaidPostFormDescriptionProps) {
  return (
    <TextField
      label="Description"
      multiline
      rows={4}
      placeholder="Description..."
      variant="outlined"
      fullWidth
      {...props}
    />
  );
}

interface RaidPostFormRaidBossesOptionsProps {
  onChange: any;
  name: string;
  selectedBosses: string[];
}

function RaidPostFormRaidBossesOptions(
  props: RaidPostFormRaidBossesOptionsProps
) {
  const { onChange, name, selectedBosses } = props;
  const { isLoading, isError, data: bosses } = useGetRaidBossesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Encountered error...</div>;
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      my={3}
    >
      <Typography variant="h6">Raid Bosses</Typography>
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {bosses.map((boss) => (
          <RaidPostFormRaidBossOption
            boss={boss}
            onChange={onChange}
            key={boss.id}
            name={name}
            checked={selectedBosses.includes(boss.id.toString())}
          />
        ))}
      </Box>
    </Box>
  );
}

interface RaidPostFormRaidBossOptionProps {
  boss: RaidBossDTO;
  onChange: any;
  name: string;
  checked: boolean;
}

function RaidPostFormRaidBossOption(props: RaidPostFormRaidBossOptionProps) {
  const { onChange, boss, name, checked } = props;
  return (
    <Checkbox
      checked={checked}
      checkedIcon={
        <Badge
          badgeContent={<CheckIcon color="secondary" fontSize="large" />}
          overlap="circle"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <RaidBossAvatar {...boss} />
        </Badge>
      }
      icon={<RaidBossAvatar {...boss} />}
      onChange={onChange}
      name={name}
      value={boss.id}
    />
  );
}

function RaidPostFormRequirementsOptions() {
  return <div>requirements...</div>;
}

function RaidPostFormRoles() {
  return <div>roles...</div>;
}

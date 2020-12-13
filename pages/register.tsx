import React from "react";
import { Box, Button, Container, Paper } from "@material-ui/core";
import { Formik, Form } from "formik";
import {
  registerUser,
  RegisterUserDTO,
} from "../services/gw2lfg-server/user/registerService";
import { UserFormTextField } from "../components/UserFormTextField";

export default function Register() {
  const registerUserOrFail = async (values: RegisterUserDTO, {}: any) => {
    try {
      const token = await registerUser(values);
      window.localStorage.setItem("jwt", token);
      console.log({ token });
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  return (
    <Container maxWidth="xs" component={Paper}>
      <Box my={3} pb={1}>
        <Formik
          onSubmit={registerUserOrFail}
          initialValues={{ username: "", password: "", apiKey: "" }}
        >
          {(props) => {
            const { handleChange } = props;
            return (
              <Form>
                <UserFormTextField
                  required
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                />
                <UserFormTextField
                  required
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  onChange={handleChange}
                />
                <UserFormTextField
                  required
                  id="apiKey"
                  label="API key"
                  name="apiKey"
                  autoComplete="apiKey"
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}

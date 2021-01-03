import React from "react";
import { Box, Button, Container, Paper } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import {
  loginUser,
  LoginUserDTO,
} from "../src/services/gw2lfg-server/user/loginService";
import { UserFormTextField } from "../src/components/UserFormTextField";
import { saveAccessToken } from "../src/utils/auth/saveAccessToken";

export default function Login() {
  const router = useRouter();

  const loginUserOrFail = async (values: LoginUserDTO, {}: any) => {
    try {
      const token = await loginUser(values);
      saveAccessToken(token);
      router.push("/raid-posts");
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  return (
    <Container maxWidth="xs" component={Paper}>
      <Box my={3} pb={1}>
        <Formik
          onSubmit={loginUserOrFail}
          initialValues={{ username: "", password: "" }}
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
                  label="password"
                  name="password"
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}

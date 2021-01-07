import React from "react";
import { Box, Button, Container, Paper } from "@material-ui/core";
import { Formik, Form } from "formik";
import { UserFormTextField } from "./UserFormTextField";

interface LoginFormProps {
  initialValues: LoginFormValues;
  onSubmit: any;
  errors: Record<string, string>;
}

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LoginForm(props: LoginFormProps) {
  const { initialValues, onSubmit, errors } = props;

  return (
    <Container maxWidth="xs" component={Paper}>
      <Box my={3} pb={1}>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {(formProps) => {
            const { handleChange } = formProps;

            const usernameError = errors["username"];
            const passwordError = errors["password"];

            return (
              <Form>
                <UserFormTextField
                  required
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                  error={!!usernameError}
                  helperText={usernameError}
                />
                <UserFormTextField
                  required
                  type="password"
                  id="password"
                  label="password"
                  name="password"
                  onChange={handleChange}
                  error={!!passwordError}
                  helperText={passwordError}
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

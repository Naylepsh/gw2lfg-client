import React from "react";
import { Box, Button, Container, Paper } from "@material-ui/core";
import { Formik, Form } from "formik";
import { UserFormTextField } from "./UserFormTextField";

interface RegisterFormProps {
  onSubmit: any;
  initialValues: RegisterFormValues;
}

interface RegisterFormValues {
  username: string;
  password: string;
  apiKey: string;
}

/**
 * Renders a register form.
 */
export default function RegisterForm(props: RegisterFormProps) {
  const { initialValues, onSubmit } = props;

  return (
    <Container maxWidth="xs" component={Paper}>
      <Box my={3} pb={1}>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {(formProps) => {
            const { errors } = formProps;

            const usernameError = errors["username"];
            const passwordError = errors["password"];
            const apiKeyError = errors["apiKey"];

            return (
              <Form>
                <UserFormTextField
                  required
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  error={!!usernameError}
                  helperText={usernameError}
                />
                <UserFormTextField
                  required
                  type="password"
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <UserFormTextField
                  required
                  id="apiKey"
                  label="API key"
                  name="apiKey"
                  autoComplete="apiKey"
                  error={!!apiKeyError}
                  helperText={apiKeyError}
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

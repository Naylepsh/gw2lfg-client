import React from "react";
import { Box, Button, Container, Paper } from "@material-ui/core";
import { Formik, Form } from "formik";
import { UserFormTextField } from "./UserFormTextField";

interface RegisterFormProps {
  onSubmit: any;
  initialValues: RegisterFormValues;
  errors: Record<string, string>;
}

interface RegisterFormValues {
  username: string;
  password: string;
  apiKey: string;
}

export default function RegisterForm(props: RegisterFormProps) {
  const { initialValues, onSubmit, errors } = props;

  return (
    <Container maxWidth="xs" component={Paper}>
      <Box my={3} pb={1}>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {(formProps) => {
            const { handleChange } = formProps;

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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <UserFormTextField
                  required
                  id="apiKey"
                  label="API key"
                  name="apiKey"
                  autoComplete="apiKey"
                  onChange={handleChange}
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

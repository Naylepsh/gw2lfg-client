import React from "react";
import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Paper,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import {
  loginUser,
  LoginUserDTO,
} from "../services/gw2lfg-server/user/loginService";
import { UserFormTextField } from "../components/UserFormTextField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      // backgroundColor: theme.palette.primary.main,
    },
  })
);

export default function Login() {
  const loginUserOrFail = async (values: LoginUserDTO, {}: any) => {
    try {
      console.log(values);
      const token = await loginUser(values);
      window.localStorage.setItem("jwt", token);
      console.log({ token });
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.box} component={Paper}>
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

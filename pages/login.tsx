import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, Input, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import {
  loginUser,
  LoginUserDTO,
} from "../services/gw2lfg-server/user/login.service";

export default function Login() {
  const loginUserOrFail = async (values: LoginUserDTO, {}: any) => {
    try {
      const token = await loginUser(values);
      window.localStorage.setItem("jwt", token);
      console.log({ token });
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  return (
    <Formik
      onSubmit={loginUserOrFail}
      initialValues={{ username: "", password: "" }}
    >
      {(props) => {
        const { handleChange } = props;
        return (
          <Form>
            <FormControl>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input onChange={handleChange} id="username" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input id="password" onChange={handleChange} />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

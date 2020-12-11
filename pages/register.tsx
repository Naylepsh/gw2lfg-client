import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, Input, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import {
  registerUser,
  RegisterUserDTO,
} from "../services/gw2lfg-server/user/register.service";

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
    <Formik
      onSubmit={registerUserOrFail}
      initialValues={{ username: "", password: "", apiKey: "" }}
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
            <FormControl>
              <InputLabel htmlFor="apiKey">API key</InputLabel>
              <Input id="apiKey" onChange={handleChange} />
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

import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel, Input, Button } from "@material-ui/core";
import { Formik, Form } from "formik";

export interface FooProps {
  name: string;
}

export default function Register() {
  const onSubmit = (x: any) => console.log(x);

  return (
    <Formik
      onSubmit={onSubmit}
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

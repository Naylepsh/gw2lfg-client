import { useRouter } from "next/router";
import React from "react";
import LoginForm from "../src/components/User/LoginForm";
import { invalidateMeQuery } from "../src/hooks/queries/users/useMeQuery";
import {
  loginUser,
  LoginUserDTO,
} from "../src/services/gw2lfg-server/user/loginService";
import { saveAccessToken } from "../src/utils/auth/saveAccessToken";

export default function Login() {
  const router = useRouter();

  const loginUserOrFail = async (values: LoginUserDTO, {}) => {
    try {
      const token = await loginUser(values);
      saveAccessToken(token);
      invalidateMeQuery();
      router.push("/raid-posts");
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  return (
    <LoginForm
      initialValues={{ username: "", password: "" }}
      onSubmit={loginUserOrFail}
    />
  );
}

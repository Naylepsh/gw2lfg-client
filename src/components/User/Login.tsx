import { useRouter } from "next/router";
import React from "react";
import LoginForm from "./LoginForm";
import { useLoginMutation } from "../../hooks/mutations/users/useLoginMutation";
import { invalidateMeQuery } from "../../hooks/queries/users/useMeQuery";
import { LoginUserDTO } from "../../services/gw2lfg-server/user/loginService";
import { saveAccessToken } from "../../utils/auth/saveAccessToken";

export default function Login() {
  const router = useRouter();
  const [loginUser] = useLoginMutation();

  const loginAndGoToMainPage = async (values: LoginUserDTO, {}) => {
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
      onSubmit={loginAndGoToMainPage}
    />
  );
}

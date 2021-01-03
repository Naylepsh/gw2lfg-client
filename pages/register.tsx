import { useRouter } from "next/router";
import React from "react";
import { invalidateMeQuery } from "../src/hooks/queries/users/useMeQuery";
import {
  registerUser,
  RegisterUserDTO,
} from "../src/services/gw2lfg-server/user/registerService";
import { saveAccessToken } from "../src/utils/auth/saveAccessToken";
import RegisterForm from "../src/components/User/RegisterForm";

export default function Register() {
  const router = useRouter();

  const registerUserOrFail = async (values: RegisterUserDTO, {}: any) => {
    try {
      const token = await registerUser(values);
      saveAccessToken(token);
      invalidateMeQuery();
      router.push("/raid-posts");
    } catch (error) {
      console.log({ error });
      throw error;
    }
  };

  return (
    <RegisterForm
      initialValues={{ username: "", password: "", apiKey: "" }}
      onSubmit={registerUserOrFail}
    />
  );
}

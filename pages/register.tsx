import { useRouter } from "next/router";
import React from "react";
import { invalidateMeQuery } from "../src/hooks/queries/users/useMeQuery";
import { RegisterUserDTO } from "../src/services/gw2lfg-server/user/registerService";
import { saveAccessToken } from "../src/utils/auth/saveAccessToken";
import RegisterForm from "../src/components/User/RegisterForm";
import { useRegisterMutation } from "../src/hooks/mutations/users/useRegisterMutation";

export default function Register() {
  const router = useRouter();
  const [registerUser] = useRegisterMutation();

  const registerAndGoToMainPage = async (values: RegisterUserDTO, {}: any) => {
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
      onSubmit={registerAndGoToMainPage}
    />
  );
}

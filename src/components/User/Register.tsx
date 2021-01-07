import { useRouter } from "next/router";
import React from "react";
import { useRegisterMutation } from "../../hooks/mutations/users/useRegisterMutation";
import { invalidateMeQuery } from "../../hooks/queries/users/useMeQuery";
import { RegisterUserDTO } from "../../services/gw2lfg-server/user/registerService";
import { saveAccessToken } from "../../utils/auth/saveAccessToken";
import RegisterForm from "./RegisterForm";

// Sets up initial form values and submit handler. Creates a register form
export function Register() {
  const router = useRouter();
  const [registerUser] = useRegisterMutation();

  const registerAndGoToMainPage = async (values: RegisterUserDTO, {}) => {
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

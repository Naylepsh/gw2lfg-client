import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useRegisterMutation } from "../../hooks/mutations/users/useRegisterMutation";
import { invalidateMeQuery } from "../../hooks/queries/users/useMeQuery";
import { RegisterUserDTO } from "../../services/gw2lfg-server/user/dtos/RegisterUserDTO";
import { saveAccessToken } from "../../utils/auth/saveAccessToken";
import { mapGw2lfgServerBadRequestErrorsToErrorMap } from "../../utils/mapGw2lfgServerBadRequestErrorsToErrorMap";
import RegisterForm from "./RegisterForm";

// Sets up initial form values and submit handler. Creates a register form
export function Register() {
  const router = useRouter();
  const [registerUser] = useRegisterMutation();
  const [errors, setErrors] = useState({} as Record<string, string>);

  const registerAndGoToMainPage = async (values: RegisterUserDTO, {}) => {
    const { data, error } = await registerUser(values);
    if (data) {
      saveAccessToken(data.token);
      invalidateMeQuery();
      router.push("/raid-posts");
    } else if (error) {
      // Gw2lfg bad requests have specific(?) structure that lets them easly get converted into detailed error messages
      if (error.status === 400 && error.data.errors) {
        setErrors(mapGw2lfgServerBadRequestErrorsToErrorMap(error.data.errors));
      }
      // If a user with the same username is already in the database, we let the user know to change their username
      else if (error.status === 422) {
        const message = "Username taken";
        setErrors({ username: message });
      }
      // for other errors we just log them
      else {
        console.error(error);
      }
    }
  };

  return (
    <RegisterForm
      initialValues={{ username: "", password: "", apiKey: "" }}
      onSubmit={registerAndGoToMainPage}
      errors={errors}
    />
  );
}

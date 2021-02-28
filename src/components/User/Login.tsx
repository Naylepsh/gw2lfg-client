import { useRouter } from "next/router";
import React from "react";
import LoginForm from "./LoginForm";
import { useLoginMutation } from "../../hooks/mutations/users/useLoginMutation";
import { invalidateMeQuery } from "../../hooks/queries/users/useMeQuery";
import { LoginUserDTO } from "../../services/gw2lfg-server/user/dtos/LoginUserDTO";
import { saveAccessToken } from "../../utils/auth/saveAccessToken";
import { useState } from "react";
import { mapGw2lfgServer400ErrorsToErrorMap } from "../../utils/mapGw2lfgServerBadRequestErrorsToErrorMap";

/*
Creates a login form with initial values and submit handler set up.
*/
export default function Login() {
  const router = useRouter();
  const [loginUser] = useLoginMutation();
  const [errors, setErrors] = useState({} as Record<string, string>);

  const loginAndGoToMainPage = async (values: LoginUserDTO, {}) => {
    const { data, error } = await loginUser(values);
    if (data) {
      saveAccessToken(data.token);
      invalidateMeQuery();
      router.push("/raid-posts");
    } else if (error) {
      // Gw2lfg bad requests have specific(?) structure that lets them easly get converted into detailed error messages
      if (error.status === 400 && error.data.errors) {
        setErrors(mapGw2lfgServer400ErrorsToErrorMap(error.data.errors));
      }
      // If user failed authorization we don't let them know which of the fields was wrong
      else if (error.status === 401) {
        const message = "Invalid username or password";
        setErrors({ username: message, password: message });
      }
      // for other errors we just log them
      else {
        console.error(error);
      }
    }
  };

  return (
    <LoginForm
      initialValues={{ username: "", password: "" }}
      onSubmit={loginAndGoToMainPage}
      errors={errors}
    />
  );
}

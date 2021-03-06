import { useRouter } from "next/router";
import React from "react";
import LoginForm from "./LoginForm";
import { useLoginMutation } from "../../hooks/mutations/users/useLoginMutation";
import { invalidateMeQuery } from "../../hooks/queries/users/useMeQuery";
import { LoginUserDTO } from "../../services/gw2lfg-server/user/dtos/LoginUserDTO";
import { saveAccessToken } from "../../utils/auth/saveAccessToken";
import { mapGw2lfgServer400ErrorsToErrorMap } from "../../utils/mapGw2lfgServer400ErrorsToErrorMap";

/**
 * Creates a login form with initial values and submit handler set up.
 */
export default function Login() {
  const router = useRouter();
  const [loginUser] = useLoginMutation();

  const loginAndGoToMainPage = async (values: LoginUserDTO, { setErrors }) => {
    const { data, error } = await loginUser(values);
    if (data) {
      saveAccessToken(data.token);
      invalidateMeQuery();
      router.push("/raid-posts");
    } else if (error) {
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
    />
  );
}

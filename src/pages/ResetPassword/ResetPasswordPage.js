import { Fragment } from "react";
import AppBar from "../../components/AppBar/AppBar";
import ResetPasswordForm from "../../components/ResetPassword/ResetPassword";

function Login() {
  return (
    <Fragment>
      <AppBar isUserLoggedIn={false} />
      <ResetPasswordForm />
    </Fragment>
  );
}

export default Login;

import { Fragment } from "react";
import AppBar from "../../components/AppBar/AppBar";
import ForgotPasswordForm from "../../components/ForgetPassword/ForgetPassword";
function Login() {
  return (
    <Fragment>
      <AppBar isUserLoggedIn={false} />
      <ForgotPasswordForm />
    </Fragment>
  );
}

export default Login;

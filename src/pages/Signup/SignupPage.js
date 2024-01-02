import { Fragment } from "react";
import AppBar from "../../components/AppBar/AppBar";
import SignupForm from "../../components/SignupForm/SignupForm";

function Login() {
  return (
    <Fragment>
      <AppBar isUserLoggedIn={false} />
      <SignupForm />
    </Fragment>
  );
}

export default Login;

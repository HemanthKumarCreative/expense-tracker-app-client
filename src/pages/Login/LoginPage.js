import { Fragment } from "react";
import AppBar from "../../components/AppBar/AppBar";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
  return (
    <Fragment>
      <AppBar isUserLoggedIn={false} />
      <LoginForm />
    </Fragment>
  );
}

export default Login;

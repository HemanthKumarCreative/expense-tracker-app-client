import { Fragment } from "react";
import AppBar from "../../components/AppBar/AppBar";
import ForgotPasswordForm from "../../components/ForgetPassword/ForgetPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const notifyError = (message) => toast.error(message);

  return (
    <Fragment>
      <AppBar isUserLoggedIn={false} />
      <div
        style={{
          width: "10rem",
          position: "absolute",
          right: 0,
        }}
      >
        <ToastContainer />
      </div>
      <ForgotPasswordForm notifyError={notifyError} />
    </Fragment>
  );
}

export default Login;

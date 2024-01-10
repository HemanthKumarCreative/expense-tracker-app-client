import { Fragment } from "react";
import AppBar from "../../components/AppBar/AppBar";
import SignupForm from "../../components/SignupForm/SignupForm";
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
      <SignupForm notifyError={notifyError} />
    </Fragment>
  );
}

export default Login;

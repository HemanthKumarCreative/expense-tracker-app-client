import { Box, Container } from "@mui/system";
import classes from "./ForgetPassword.module.css";
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../assets/index";

export default function Login() {
  const {
    container,
    loginHead,
    inputBox,
    btn,
    formContainer,
    signupLink,
    accAction,
    link,
    msgContainer,
  } = classes;

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/password/forgot-password`,
        {
          email,
        }
      );
      navigate("/");
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("User Not found, please try entering correct email");
    }
  };
  console.log({ message });
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{ height: "80vh" }}>
          <Box className={container}>
            <h2 className={loginHead}>Forgot Password</h2>
            <form onSubmit={handleSubmit} className={formContainer}>
              <div>Email</div>
              <input
                className={inputBox}
                type="email"
                value={email}
                name="email"
                onChange={handleEmailChange}
                placeholder="Enter the email"
              />
              <div>
                <button className={btn} type="submit">
                  Reset Password
                </button>
              </div>
              <Typography variant="body1" color="textSecondary" align="center">
                {message}
              </Typography>
            </form>
            <div className={accAction}>
              <div className={signupLink}>
                <div>Existing User?</div>
                <a onClick={() => navigate("/")} className={link}>
                  Login
                </a>
              </div>
              <div className={signupLink}>
                <div>New user?</div>
                <a onClick={() => navigate("/signup")} className={link}>
                  Sign up
                </a>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

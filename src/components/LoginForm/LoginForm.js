import { Box, Container } from "@mui/system";
import classes from "./LoginForm.module.css";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../assets/index";

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
  } = classes;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/user/login`, {
        ...formData,
      });

      if (response.status === 201 || response.status === 200) {
        const data = await response.data.body;

        Cookies.set("userInfo", JSON.stringify(data.user));
        Cookies.set("token", data.token);
        navigate("/home");
        window.location.reload(true);
      } else {
        const errorData = await response.data;
        console.error("Error:", errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{ height: "80vh" }}>
          <Box className={container}>
            <h2 className={loginHead}>Login</h2>
            <form onSubmit={handleSubmit} className={formContainer}>
              <div>Email</div>
              <input
                className={inputBox}
                type="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
              <div>Password</div>
              <input
                className={inputBox}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <div>
                <button className={btn} type="submit">
                  Login
                </button>
              </div>
            </form>
            <div className={accAction}>
              <a href="/signup" className={link}>
                Forgot Password?
              </a>
              <div className={signupLink}>
                <div>New user?</div>
                <a href="/signup" className={link}>
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

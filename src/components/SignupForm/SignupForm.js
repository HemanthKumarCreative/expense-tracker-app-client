import { Box, Container } from "@mui/system";
import classes from "./SignupForm.module.css";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../assets/index";

export default function Signup() {
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
    name: "",
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
      const response = await axios.post(`${BASE_URL}/api/v1/user/signup`, {
        ...formData,
      });
      if (response.status === 201 || response.status === 200) {
        const data = await response.data;

        Cookies.set("userInfo", JSON.stringify(data.body.user));
        Cookies.set("token", data.body.token);
        navigate("/Home");
        // window.location.reload(true);
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
            <h2 className={loginHead}>Sign Up</h2>
            <form onSubmit={handleSubmit} className={formContainer}>
              <div>User Name</div>
              <input
                className={inputBox}
                type="text"
                value={formData.name}
                name="name"
                onChange={handleChange}
                placeholder="Enter the user name"
              />
              <div>Email</div>
              <input
                className={inputBox}
                type="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                placeholder="Enter the email"
              />
              <div>Password</div>
              <input
                className={inputBox}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter the password"
              />
              <div>
                <button className={btn} type="submit">
                  Sign Up
                </button>
              </div>
            </form>
            <div className={accAction}>
              <a onClick={() => navigate("/forget-password")} className={link}>
                Forgot Password?
              </a>
              <div className={signupLink}>
                <div>Existing User?</div>
                <a onClick={() => navigate("/")} className={link}>
                  Login
                </a>
              </div>
            </div>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

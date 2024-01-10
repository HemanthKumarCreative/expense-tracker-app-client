import { Box, Container } from "@mui/system";
import classes from "./LoginForm.module.css";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../assets/index";
import CustomLoader from "../Loader/Loader";

export default function Login({ notifyError }) {
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

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/user/login`, {
        ...formData,
      });

      if (response.status === 201 || response.status === 200) {
        const data = await response.data.body;
        setLoading(false);
        Cookies.set("userInfo", JSON.stringify(data.user));
        Cookies.set("token", data.token);
        navigate("/home");
        window.location.reload(true);
      } else {
        const errorData = await response.data;
        notifyError(errorData?.message);
        setLoading(false);
      }
    } catch (error) {
      notifyError(error?.message);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box sx={{ height: "80vh" }}>
          <Box className={container}>
            <h2 className={loginHead}>Login</h2>
            {loading && <CustomLoader />}
            {!loading && (
              <form onSubmit={handleSubmit} className={formContainer}>
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
                  <button
                    className={btn}
                    type="submit"
                    disabled={
                      formData?.email === "" || formData.password === ""
                    }
                  >
                    Login
                  </button>
                </div>
              </form>
            )}
            <div className={accAction}>
              <a onClick={() => navigate("/forget-password")} className={link}>
                Forgot Password?
              </a>
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

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import classes from "./AppBar.module.css";
import proImage from "../../assets/pro.png";
import basicImage from "../../assets/basic.png";

export default function ButtonAppBar({ isUserLoggedIn, isPremiumUser }) {
  const {
    logOutBtn,
    container,
    appBar,
    brand,
    brandContainer,
    premiumContainer,
    imgContainer,
    img,
    buttonContainer,
  } = classes;
  return (
    <Box position="static" className={classes.appBar}>
      <div className={classes.container}>
        <div>
          {isUserLoggedIn && <button className={logOutBtn}>logout</button>}
        </div>
      </div>
    </Box>
  );
}

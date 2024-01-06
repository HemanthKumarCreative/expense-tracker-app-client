import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar/AppBar";
import SideBar from "../../components/SideBar/SideBar";
import UserList from "../../components/UserList/UserList";
import Cookies from "js-cookie";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileView from "../MobileView/MobileView";

export default function LeaderBoardPage() {
  const userInfo = JSON.parse(Cookies.get("userInfo"));
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("md"));

  return !mobileScreen ? (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <AppBar isUserLoggedIn={true} />
        </Grid>
        <Grid item xs={12} md={2}>
          <SideBar isPremiumUser={userInfo?.isPremiumUser} />
        </Grid>
        <Grid item xs={12} md={12}>
          <UserList />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <MobileView />
  );
}

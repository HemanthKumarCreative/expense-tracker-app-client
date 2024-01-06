import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar/AppBar";
import SideBar from "../../components/SideBar/SideBar";
import ReportGeneration from "../../components/ReportGeneration/ReportGeneration";
import Cookies from "js-cookie";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileView from "../MobileView/MobileView";

export default function GenerateReport() {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const userInfo = JSON.parse(Cookies.get("userInfo"));

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
          <ReportGeneration
            userInfo={userInfo}
            isPremiumUser={userInfo?.isPremiumUser}
          />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <MobileView />
  );
}

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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GenerateReport({ userInfo }) {
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const [loading, setLoading] = React.useState(false);

  return !mobileScreen ? (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <AppBar
            isUserLoggedIn={true}
            isPremiumUser={userInfo?.isPremiumUser}
            userInfo={userInfo}
          />
          <div
            style={{
              width: "10rem",
              position: "absolute",
              right: 0,
            }}
          >
            <ToastContainer />
          </div>
        </Grid>
        <Grid item xs={12} md={2}>
          <SideBar
            isPremiumUser={userInfo?.isPremiumUser}
            userInfo={userInfo}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <ReportGeneration
            userInfo={userInfo}
            isPremiumUser={userInfo?.isPremiumUser}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
            setLoading={setLoading}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <MobileView
      notifyError={notifyError}
      notifySuccess={notifySuccess}
      loading={loading}
      setLoading={setLoading}
    />
  );
}

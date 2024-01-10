import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar/AppBar";
import SideBar from "../../components/SideBar/SideBar";
import ReportHistoryTable from "../../components/ReportsDownloads/ReportsDownloads";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllReports } from "../../redux/report/reportSlice";
import Cookies from "js-cookie";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileView from "../MobileView/MobileView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReportsHistoryPage({ userInfo }) {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report);
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("md"));
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  useEffect(() => {
    dispatch(fetchAllReports(userInfo?.id));
  }, []);

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
          <ReportHistoryTable
            downloads={report?.reports}
            userInfo={userInfo}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
            loading={report?.loading}
          />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <MobileView />
  );
}

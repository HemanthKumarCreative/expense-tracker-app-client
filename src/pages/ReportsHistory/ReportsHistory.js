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

export default function ReportsHistoryPage({ userInfo }) {
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report);
  const theme = useTheme();
  const mobileScreen = useMediaQuery(theme.breakpoints.down("md"));

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
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <SideBar
            isPremiumUser={userInfo?.isPremiumUser}
            userInfo={userInfo}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <ReportHistoryTable downloads={report?.reports} userInfo={userInfo} />
        </Grid>
      </Grid>
    </Box>
  ) : (
    <MobileView />
  );
}

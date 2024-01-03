import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar/AppBar";
import SideBar from "../../components/SideBar/SideBar";
import ReportHistoryTable from "../../components/ReportsDownloads/ReportsDownloads";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllReports } from "../../redux/report/reportSlice";
import Cookies from "js-cookie";

export default function ReportsHistoryPage() {
  const userInfo = JSON.parse(Cookies.get("userInfo"));
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchAllReports(userInfo?.id));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <AppBar isUserLoggedIn={true} />
        </Grid>
        <Grid item xs={12} md={2}>
          <SideBar />
        </Grid>
        <Grid item xs={12} md={12}>
          <ReportHistoryTable downloads={report?.reports} />
        </Grid>
      </Grid>
    </Box>
  );
}

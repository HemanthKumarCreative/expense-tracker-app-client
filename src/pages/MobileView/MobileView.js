import React, { useEffect } from "react";
import AppBar from "../../components/AppBar/AppBar";
import Cookies from "js-cookie";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../redux/expense/expenseSlice";
import ExpenseList from "../../components/ExpenseList/ExpenseList";
import UserList from "../../components/UserList/UserList";
import ReportGeneration from "../../components/ReportGeneration/ReportGeneration";
import ReportHistoryTable from "../../components/ReportsDownloads/ReportsDownloads";
import { fetchAllReports } from "../../redux/report/reportSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MobileView({ notifyError, notifySuccess }) {
  let userInfo = {};
  if (Cookies.get("userInfo")) {
    userInfo = JSON.parse(Cookies.get("userInfo"));
  }
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense);
  const report = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchAllReports(userInfo?.id));
  }, []);

  useEffect(() => {
    dispatch(fetchExpenses(userInfo?.id));
  }, []);

  return (
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
              width: "6rem",
              position: "absolute",
              right: 0,
            }}
          >
            <ToastContainer />
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <ExpenseForm
            userInfo={userInfo}
            notifyError={notifyError}
            notifySuccess={notifySuccess}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <ExpenseList expenses={expense?.expenses} />
        </Grid>
        {userInfo?.isPremiumUser && (
          <>
            <Grid item xs={12} md={12}>
              <UserList />
            </Grid>
            <Grid item xs={12} md={12}>
              <ReportGeneration
                userInfo={userInfo}
                isPremiumUser={userInfo?.isPremiumUser}
                notifyError={notifyError}
                notifySuccess={notifySuccess}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ReportHistoryTable downloads={report?.reports} />
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
}

export default MobileView;

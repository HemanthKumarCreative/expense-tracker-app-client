import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar/AppBar";
import SideBar from "../../components/SideBar/SideBar";
import ExpenseList from "../../components/ExpenseList/ExpenseList";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../redux/expense/expenseSlice";
import Cookies from "js-cookie";

export default function ExpenseListPage() {
  const userInfo = JSON.parse(Cookies.get("userInfo"));
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(fetchExpenses(userInfo?.id));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <AppBar isUserLoggedIn={true} />
        </Grid>
        <Grid item xs={12} md={2}>
          <SideBar isPremiumUser={userInfo?.isPremiumUser} />
        </Grid>
        <Grid item xs={12} md={12}>
          <ExpenseList expenses={expense?.expenses} />
        </Grid>
      </Grid>
    </Box>
  );
}

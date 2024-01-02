import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppBar from "../../components/AppBar/AppBar";
import SideBar from "../../components/SideBar/SideBar";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import ExpenseList from "../../components/ExpenseList/ExpenseList";

export default function HomePage() {
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
          <ExpenseForm />
        </Grid>
      </Grid>
    </Box>
  );
}

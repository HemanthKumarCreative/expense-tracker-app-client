import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Signup/SignupPage";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPassword/ResetPasswordPage";
import ExpenseListPage from "./pages/ExpenseList/ExpenseList";
import LeaderBoardPage from "./pages/LeaderBoard/LeaderBoard";
import GenerateReportPage from "./pages/GenerateReport/GenerateReport";
import ReportHistoryPage from "./pages/ReportsHistory/ReportsHistory";
import Cookies from "js-cookie";

const App = () => {
  let userInfo = null;
  const cookie = Cookies.get("userInfo");

  if (!!cookie) {
    userInfo = JSON.parse(cookie);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage userInfo={userInfo} />} />
        <Route
          path="/expense-list"
          element={<ExpenseListPage userInfo={userInfo} />}
        />
        <Route
          path="/leader-board"
          element={<LeaderBoardPage userInfo={userInfo} />}
        />
        <Route
          path="/generate-report"
          element={<GenerateReportPage userInfo={userInfo} />}
        />
        <Route
          path="/report-history"
          element={<ReportHistoryPage userInfo={userInfo} />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

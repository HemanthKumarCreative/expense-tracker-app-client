import React from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../assets/index";
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import classes from "./ReportGeneration.module.css";
import CustomLoader from "../Loader/Loader";

const ReportGeneration = ({
  isPremiumUser,
  userInfo,
  notifyError,
  notifySuccess,
  setLoading,
  loading,
}) => {
  const expense = useSelector((state) => state.expense);
  const { btn } = classes;

  const storeToDB = async (reportUrl) => {
    const downloadRecord = {
      userId: userInfo.id,
      fileLink: reportUrl,
    };
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/download`,
        downloadRecord
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    const userId = userInfo.id;
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/report/${userId}`);
      const data = await response.data.body;
      const reportUrl = data?.report_url;
      if (reportUrl !== undefined) {
        await storeToDB(reportUrl);
        notifySuccess("Expense Report Generated Succesfully");
        window.open(reportUrl, "_blank");
        setLoading(false);
      }
      // Open the URL in a new tab
    } catch (error) {
      console.error("Error:", error);
      notifyError(error.message);
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Report Generation
      </Typography>
      {loading && <CustomLoader />}
      {!loading && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDownload}
          disabled={!isPremiumUser || expense?.expenses?.length === 0}
          className={btn}
        >
          Download Expenses
        </Button>
      )}
    </Container>
  );
};

export default ReportGeneration;

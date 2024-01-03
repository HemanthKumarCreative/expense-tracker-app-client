import React from "react";
import { Button, Box } from "@mui/material";
import axios from "axios";
import BASE_URL from "../../assets/index";
import { Container, Typography } from "@mui/material";
import { display } from "@mui/system";

const ReportGeneration = ({
  isPremiumUser,
  userInfo,
  getAllDownloads,
  expenses,
}) => {
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
      const data = await response.data;
      if (data) {
        getAllDownloads();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async () => {
    const userId = userInfo.id;
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/report/${userId}`);
      console.log({ response });
      const data = await response.data.body;
      const reportUrl = data?.report_url;
      if (reportUrl !== undefined) {
        await storeToDB(reportUrl);
        window.open(reportUrl, "_blank");
      }
      // Open the URL in a new tab
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Report Generation
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDownload}
        disabled={!isPremiumUser || expenses?.length === 0}
      >
        Download Expenses
      </Button>
    </Container>
  );
};

export default ReportGeneration;

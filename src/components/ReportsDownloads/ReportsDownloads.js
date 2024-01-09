import React from "react";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
  Typography,
} from "@mui/material";
import classes from "./ReportsDownloads.module.css";
import NoDataComponent from "../NoData/NoData";
import { NO_REPORTS_MESSAGE } from "../../assets/index";

const ReportHistoryTable = ({ downloads }) => {
  const { btn, heading, rightAlign } = classes;
  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Download History
      </Typography>
      {downloads?.length === 0 ? (
        <NoDataComponent message={NO_REPORTS_MESSAGE} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={heading}>Date</TableCell>
                <TableCell className={heading}>Time</TableCell>
                <TableCell className={`${heading} ${rightAlign}`}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {downloads.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.time}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      href={report.fileLink}
                      download={true}
                      style={{ margin: "5px" }}
                      size="small"
                      className={`${btn} ${rightAlign}`}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ReportHistoryTable;

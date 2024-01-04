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

const ReportHistoryTable = ({ downloads }) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Download History
      </Typography>
      <TableContainer component={Paper}>
        <Table style={{ width: "65%" }}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Action</TableCell>
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
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReportHistoryTable;

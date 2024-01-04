import React from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const ExpenseList = ({ expenses }) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Expense List
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{"Amount ( $ )"}</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ height: "13rem" }}>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ExpenseList;

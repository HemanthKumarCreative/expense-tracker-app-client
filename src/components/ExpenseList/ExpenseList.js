import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../../redux/expense/expenseSlice";

const ExpenseList = ({ userInfo }) => {
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense);
  const { expenses } = expense;
  console.log({ expenses: expenses.currentPage });
  useEffect(() => {
    dispatch(fetchExpenses(userInfo?.id));
  }, []);

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
          {expenses?.expenses?.map((expense) => (
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

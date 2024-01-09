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
import classes from "./ExpenseList.module.css";
import NoDataComponent from "../NoData/NoData";
import { NO_EXPENSE_MESSAGE } from "../../assets/index";
import CustomLoader from "../Loader/Loader";

const ExpenseList = ({ userInfo }) => {
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense);
  console.log({ expense });
  const { expenses, error, loading } = expense;
  const { scroller, heading, rightAlign } = classes;

  useEffect(() => {
    dispatch(fetchExpenses(userInfo?.id));
  }, []);

  return (
    <Container maxWidth="sm" className={scroller}>
      <Typography variant="h4" align="center" gutterBottom>
        Expense List
      </Typography>
      {loading && (
        <CustomLoader type="Bars" color="#00BFFF" height={80} width={80} />
      )}
      {!loading &&
        (expenses?.length === 0 ? (
          <NoDataComponent message={NO_EXPENSE_MESSAGE} />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={heading}>Date</TableCell>
                <TableCell className={heading}>{"Amount ( $ )"}</TableCell>
                <TableCell className={heading}>Description</TableCell>
                <TableCell className={`${heading} ${rightAlign}`}>
                  Category
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses?.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className={rightAlign}>
                    {expense.category}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
    </Container>
  );
};

export default ExpenseList;

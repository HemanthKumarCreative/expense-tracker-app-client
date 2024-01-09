import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "../../assets/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/user/userSlice";
import classes from "./UserList.module.css";
import Loader from "../Loader/Loader";

const UserList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { heading, rightAlign } = classes;
  const { users, error, loading } = user;
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Leader Board
      </Typography>
      {loading && <Loader />}
      {!loading && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={heading}>Name</TableCell>
                <TableCell className={`${heading} ${rightAlign}`}>
                  Total Expenses
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user?.users?.length &&
                user?.users?.slice(0, 6).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className={rightAlign}>
                      {user.totalExpenses}
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

export default UserList;

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
import BASE_URL from "../../assets/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/user/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Leader Board
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Total Expenses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user?.users?.length &&
              user?.users?.slice(0, 6).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.totalExpenses}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserList;

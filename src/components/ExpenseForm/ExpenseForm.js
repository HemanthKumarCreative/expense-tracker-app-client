import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import axios from "axios";
import BASE_URL from "../../assets/index";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = ({ userInfo, fetchExpenses, setExpanded }) => {
  const { btn } = classes;
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTotalExpense = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/user/${userInfo.id}`
      );
      const totalExpense = await response.data.body.totalExpenses;
      return totalExpense;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTotalExpense = async (expense) => {
    try {
      const totalExpense = await getTotalExpense();
      const response = await axios.put(
        `${BASE_URL}/api/v1/user/${userInfo.id}`,
        { totalExpenses: parseInt(totalExpense) + parseInt(expense) }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = userInfo.id;
    formData.userId = userId;

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/expense`, {
        ...formData,
      });

      if (response.statusText === "Created") {
        await updateTotalExpense(response.data.body.amount);
        await fetchExpenses();
        setExpanded("panel2");
      } else {
        const errorData = await response.data;
        console.error("Error:", errorData.message);
      }
      setFormData({
        amount: "",
        description: "",
        category: "Food",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add Expense
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Amount Spent"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              variant="outlined"
              color="success"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              color="success"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              select
              name="category"
              value={formData.category}
              onChange={handleChange}
              variant="outlined"
              SelectProps={{
                native: true,
                color: "success",
              }}
              color="success"
            >
              <option value="Food" color="success">
                Food
              </option>
              <option value="Petrol" color="success">
                Petrol
              </option>
              <option value="Salary" color="success">
                Salary
              </option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              className={btn}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Add Expense
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ExpenseForm;

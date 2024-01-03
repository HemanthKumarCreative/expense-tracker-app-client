import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../../assets/index";
import axios from "axios";

const initialState = {
  loading: false,
  expenses: [],
  error: "",
};

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  (userId, page) => {
    return axios
      .get(`${BASE_URL}/api/v1/expense/${userId}?page=${page}`)
      .then((response) => response.data)
      .then((data) => data.body)
      .then((body) => body.expenses);
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.loading = false;
      state.expenses = action.payload;
      state.error = "";
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      state.loading = false;
      state.expenses = [];
      state.error = action.error.message;
    });
  },
});

export default expenseSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../assets/index";
import axios from "axios";

const initialState = {
  loading: false,
  expenses: [],
  error: "",
};

function formatTimestamp(timestamp) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(timestamp).toLocaleDateString(undefined, options);
  const time = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return {
    date: date,
    time: time,
  };
}

export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  (userId) => {
    return axios
      .get(`${BASE_URL}/api/v1/expense/${userId}`)
      .then((response) => response.data)
      .then((data) => data.body)
      .then((expense) => {
        const { expenses } = expense;
        return expenses.map((expense) => {
          const dateTimeObject = formatTimestamp(expense.createdAt);
          return {
            ...expense,
            date: dateTimeObject.date,
            time: dateTimeObject.time,
          };
        });
      });
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

import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense/expenseSlice";
import reportReducer from "./report/reportSlice";

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    report: reportReducer,
  },
});

export default store;

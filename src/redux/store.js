import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense/expenseSlice";
import reportReducer from "./report/reportSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    report: reportReducer,
    user: userReducer,
  },
});

export default store;

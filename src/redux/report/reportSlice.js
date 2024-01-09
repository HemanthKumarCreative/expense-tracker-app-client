import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../assets/index";
import axios from "axios";

const initialState = {
  loading: false,
  reports: [],
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

export const fetchAllReports = createAsyncThunk(
  "report/fetchAllReports",
  (userId) => {
    return axios
      .get(`${BASE_URL}/api/v1/download/${userId}`)
      .then((response) => response.data)
      .then((data) => data.body)
      .then((data) => {
        return data.map((download) => {
          const updatedDownload = {};
          updatedDownload.id = download.id;
          const dateTimeObject = formatTimestamp(download.createdAt);
          updatedDownload.date = dateTimeObject.date;
          updatedDownload.time = dateTimeObject.time;
          updatedDownload.fileLink = download.fileLink;
          return updatedDownload;
        });
      });
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllReports.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchAllReports.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload;
      state.error = "";
    });

    builder.addCase(fetchAllReports.rejected, (state, action) => {
      state.loading = false;
      state.reports = [];
      state.error = action.error.message;
    });
  },
});

export default reportSlice.reducer;

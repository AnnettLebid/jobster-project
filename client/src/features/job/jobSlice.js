import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { createJobThunk, deleteJobThunk, editJobThunk } from "./jobThunk";

export const createJob = createAsyncThunk("job/createJob", createJobThunk);
export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);
export const editJob = createAsyncThunk("job/editJob", editJobThunk);

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state) => {
      toast.success("Job Created");
      state.isLoading = false;
    });
    builder.addCase(createJob.rejected, (state, { payload }) => {
      toast.error(payload);
      state.isLoading = false;
    });
    builder.addCase(deleteJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteJob.fulfilled, (state) => {
      toast.success("Job Deleted");
      state.isLoading = false;
    });
    builder.addCase(deleteJob.rejected, (state, { payload }) => {
      toast.error(payload);
      state.isLoading = false;
    });
    builder.addCase(editJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editJob.fulfilled, (state) => {
      toast.success("Job Modified...");
      state.isLoading = false;
    });
    builder.addCase(editJob.rejected, (state, { payload }) => {
      toast.error(payload);
      state.isLoading = false;
    });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;

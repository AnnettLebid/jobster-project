import { configureStore, ThunkDispatch, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import jobSlice from "./features/job/jobSlice";
import userSlice from "./features/user/userSlice";
import allJobsSlice from "./features/allJobs/allJobsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;

export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

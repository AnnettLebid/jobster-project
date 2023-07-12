import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearAllJobsState } from "../allJobs/allJobsSlice";
import { clearValues } from "../job/jobSlice";
import { logoutUser } from "./userSlice";
import { UserInterface } from "../../utils/types";

export const registerUserThunk = async (
  url: string,
  user: Partial<UserInterface>,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (
  url: string,
  user: Partial<UserInterface>,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (
  url: string,
  user: Partial<UserInterface>,
  thunkAPI: any
) => {
  try {
    //if we use headers instead of interceptors
    // const resp = await customFetch.patch(url, user, {
    //   headers: {
    //     authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    //   },
    // });
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error: any) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (thunkAPI: any) => {
  try {
    thunkAPI.dispatch(logoutUser());
    thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch {
    return Promise.reject();
  }
};

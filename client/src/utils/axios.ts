import axios, { AxiosHeaders } from "axios";
import { clearStore } from "../features/user/userSlice";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "/api/v1",
});

//we can add the interceptors to custom fetch (headers will be added automatically)
//or to add auth headers or we can send authorization headers with each request
customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user && config.headers) {
    (config.headers as AxiosHeaders).set(
      "Authorization",
      `Bearer ${user.token}`
    );
  }
  return config;
});

export const checkForUnauthorizedResponse = (error: any, thunkAPI: any) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore(thunkAPI));
    return thunkAPI.rejectWithValue("Unauthorized! Logging out..");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;

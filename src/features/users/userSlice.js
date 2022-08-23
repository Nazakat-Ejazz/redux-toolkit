import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState = [];

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    try {
      const res = await Axios.get(USERS_URL);
      return [...res.data];
    } catch (err) {
      return err.message;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

//export const {} = userSlice.actions;

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;

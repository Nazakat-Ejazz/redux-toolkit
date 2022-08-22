import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "Nazakat Ejaz",
  },
  {
    id: "2",
    name: "Akkiz Berjlar",
  },
  {
    id: "3",
    name: "Atticus Milo",
  },
];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

//export const {} = userSlice.actions;

export const selectAllUsers = (state) => state.users;

export default userSlice.reducer;

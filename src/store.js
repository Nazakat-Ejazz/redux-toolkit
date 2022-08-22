import { configureStore } from "@reduxjs/toolkit";
import postReduer from "./features/posts/postsSlice";
import userReducer from "./features/users/userSlice";

const store = configureStore({
  reducer: {
    posts: postReduer,
    users: userReducer,
  },
});

export default store;

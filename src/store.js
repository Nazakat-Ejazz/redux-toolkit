import { configureStore } from "@reduxjs/toolkit";
import postReduer from "./features/posts/postsSlice";

const store = configureStore({
  reducer: {
    posts: postReduer,
  },
});

export default store;

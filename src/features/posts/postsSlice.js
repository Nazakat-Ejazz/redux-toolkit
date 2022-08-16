import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "Learning Redux Toolkit",
    content: "I've heard good things about it",
  },
  {
    id: 2,
    title: "Slices",
    content: "The more I say slices , the more I want pizza.",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

export const { addNewPost } = postSlice.actions;

export const selectAllPosts = (state) => state.posts;
export default postSlice.reducer;

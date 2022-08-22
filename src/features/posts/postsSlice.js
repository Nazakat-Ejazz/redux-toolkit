import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    title: "Learning Redux Toolkit",
    content: "I've heard good things about it",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: 2,
    title: "Slices",
    content: "The more I say slices , the more I want pizza.",
    date: sub(new Date(), { minutes: 3 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
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
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },

    addNewReaction(state, action) {
      const { postId, reaction } = action.payload;
      const searchPost = state.find((post) => post.id === postId);
      if (searchPost) {
        searchPost.reactions[reaction]++;
      }
    },
  },
});

export const { addNewPost, addNewReaction } = postSlice.actions;

export const selectAllPosts = (state) => state.posts;

export default postSlice.reducer;

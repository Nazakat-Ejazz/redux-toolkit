import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import Axios from "axios";

const initialState = {
  posts: [],
  status: "idle", // loading , success , failure
  error: null,
};

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    try {
      const res = await Axios.get(API_URL);
      return [...res.data];
    } catch (err) {
      return err.message;
    }
  }
);

export const submitNewPost = createAsyncThunk(
  "posts/submitNewPost",
  async (newPostProps) => {
    try {
      const res = await Axios.post(API_URL, newPostProps);
      return res.data;
    } catch (err) {
      return err.message;
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addNewPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
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
      const searchPost = state.posts.find((post) => post.id === postId);
      if (searchPost) {
        searchPost.reactions[reaction]++;
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchAllPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = "success";
        let min = 3;

        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: Math.floor(Math.random() * 10),
            wow: Math.floor(Math.random() * 10),
            heart: Math.floor(Math.random(1, 20) * 10),
            rocket: Math.floor(Math.random(1, 20) * 10),
            coffee: Math.floor(Math.random(1, 20) * 10),
          };
          return post;
        });

        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      })

      .addCase(submitNewPost.fulfilled, (state, action) => {
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });

        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        console.log(action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const { addNewPost, addNewReaction } = postSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;
export const getAllPostsStatus = (state) => state.posts.status;
export const getAllPostsError = (state) => state.posts.error;

export default postSlice.reducer;

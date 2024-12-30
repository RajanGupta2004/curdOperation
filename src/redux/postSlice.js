import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  allPost: [],
  postId: null,
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addToAllPost(state, action) {
      const newPosts = action.payload;
      state.allPost = [...newPosts, ...state.allPost];
    },

    deletePost(state, action) {
      const postId = action.payload;
      state.allPost = state.allPost.filter((post) => post.id != postId);
    },

    addPostId(state, action) {
      state.postId = action.payload;
    },

    updatePost(state, action) {
      const { id, updatedData } = action.payload;
      console.log(updatedData, id);
      // const postIndex = state.allPost.findIndex((post) => post.id === id);
      // if (postIndex !== -1) {
      //   state.allPost[postIndex] = {
      //     ...state.allPost[postIndex],
      //     ...updatedData,
      //   };
      // }
    },
  },
});

export const { addToAllPost, deletePost, updatePost, addPostId } =
  postSlice.actions;

export default postSlice.reducer;

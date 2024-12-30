import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addToAllPost, deletePost, updatePost } from "../redux/postSlice";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addToAllPost(data));
        } catch (error) {
          console.log("Error in getAll query", error);
        }
      },
    }),

    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
    }),

    getPostByLimit: builder.query({
      query: (num) => ({
        url: `posts?_limit=${num}`,
        method: "GET",
      }),
    }),

    deletePostById: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          dispatch(deletePost(params));
        } catch (error) {
          console.log("Error in ", error);
        }
      },
    }),

    addPost: builder.mutation({
      query: (newPost) => ({
        url: `/posts`,
        method: "POST",
        body: newPost,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),

      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addToAllPost([data]));
        } catch (error) {
          console.log("Error in addPost Query dispatch", error);
        }
      },
    }),

    updatePost: builder.mutation({
      query: (updatePost) => {
        const { id, ...data } = updatePost;
        return {
          url: `posts/${id}`,
          method: "PUT",
          body: data,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },

      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updatePost({ id: params.id, updatedData: data }));
        } catch (error) {
          console.log("Error in update post", error);
        }
      },
    }),
  }),
});

export const {
  useGetPostByIdQuery,
  useGetAllPostsQuery,
  useGetPostByLimitQuery,
  useDeletePostByIdMutation,
  useAddPostMutation,
  useUpdatePostMutation,
} = postApi;

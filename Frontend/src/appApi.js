// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import MyArticles from './components/BLOG/MyArticles';

// Define a service using a base URL and expected endpoints
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://student-utility-hackoverflow.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },

  }),
  tagTypes: ["Post", "User", "Todo"],

  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,

      }),
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,

      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'DELETE',
      }),
    }),

    createPost: builder.mutation({
      query: (article) => ({
        url: '/posts',
        method: 'POST',
        body: article,

      }),
      invalidatesTags: ["Post"],
    }),

    getAllPosts: builder.query({
      query: () => ({
        url: '/posts',
      }),
      providesTags: ["Post"],
    }),

    getOnePosts: builder.query({
      query: (id) => ({
        url: `posts/articles/${id}`,
      }),
      providesTags: ["Post"],
    }),

    getAllUsersPosts: builder.query({
      query: () => ({
        url: 'posts/me',
      }),
      providesTags: ["Post"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),

    updatePost: builder.mutation({
      query: ({id, ...post }) =>({
        url: `/posts/${id}`,
        method: "PATCH",
        body: post,
      }),
      invalidatesTags: ["Post"],

    }),

    createTask: builder.mutation({
      query: (list) => ({
        url: '/lists',
        method: 'POST',
        body: list,

      }),
      invalidatesTags: ["Todo"],
    }),

    getAllUserLists: builder.query({
      query: () => ({
        url: 'lists/me',
      }),
      providesTags: ["Todo"],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),

    updateTask: builder.mutation({
      query: ({id, ...list} ) =>({
        url: `/lists/me/${id}`,
        method: "PATCH",
        body: list,
      }),
      invalidatesTags: ["Todo"],

    }),


  }),
})

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation, useCreatePostMutation ,  useGetOnePostsQuery, useGetAllUsersPostsQuery, useGetAllPostsQuery, useDeletePostMutation, useUpdatePostMutation, useCreateTaskMutation, useGetAllUserListsQuery, useDeleteTaskMutation, useUpdateTaskMutation} = appApi;
export default appApi;
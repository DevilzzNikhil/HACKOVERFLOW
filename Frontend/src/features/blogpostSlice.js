import { createSlice } from '@reduxjs/toolkit'
import appApi from '../appApi';
const initialState = {};


export const blogpostSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {


    builder.addMatcher(appApi.endpoints.getAllPosts.matchFulfilled, (state, { payload }) => {
      return payload
    });


  },
})

export default blogpostSlice.reducer 
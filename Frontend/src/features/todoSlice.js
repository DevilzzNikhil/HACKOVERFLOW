import { createSlice } from '@reduxjs/toolkit'
import appApi from '../appApi';
const initialState = {};


export const todoSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(appApi.endpoints.getAllUserLists.matchFulfilled, (state, { payload }) => {
      return payload
    });
  },
})

export default todoSlice.reducer 
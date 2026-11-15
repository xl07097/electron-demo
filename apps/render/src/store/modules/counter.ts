import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 1,
  },
  reducers: {
    addCount(state, actions?) {
      state.count = ++state.count;
    },
  },
});

export default counterSlice.reducer;

export const { addCount } = counterSlice.actions;

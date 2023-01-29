import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUES = {
  file: null,
};

const fileSlice = createSlice({
  name: "file",
  initialState: INITIAL_VALUES,
  reducers: {
    addFile: (state, action) => {
      state.file = action.payload;
    },
    removeFile: (state) => {
      state.file = null;
    },
  },
});

export const fileActions = fileSlice.actions;

export default fileSlice.reducer;

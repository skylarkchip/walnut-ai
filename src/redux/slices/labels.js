import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  labels: [],
  selectedLabel: "",
};

const labelsSlice = createSlice({
  name: "labels",
  initialState: INITIAL_STATE,
  reducers: {
    addLabel: (state, action) => {
      state.labels.push(action.payload);
    },
    removeLabel: (state, action) => {
      state.labels = state.labels.filter(
        (label) => label.id !== action.payload
      );
    },
    clearLabel: (state) => {
      state.labels = [];
    },
    setSelectedLabel: (state, action) => {
      state.selectedLabel = action.payload;
    },
  },
});

export const labelsAction = labelsSlice.actions;

export default labelsSlice.reducer;

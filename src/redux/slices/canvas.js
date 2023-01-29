import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  currentBox: null,
  boundingBox: [],
  isDrawing: false,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState: INITIAL_STATE,
  reducers: {
    getCurrentBox: (state, action) => {
      state.currentBox = action.payload;
    },
    clearCurrentBox: (state) => {
      state.currentBox = null;
    },
    addBoundingBox: (state, action) => {
      state.boundingBox.push(action.payload);
    },
    setIsDrawing: (state, action) => {
      state.isDrawing = action.payload;
    },
    updateBoundingBox: (state, action) => {
      const itemIdx = state.boundingBox.findIndex(
        (box) => box.id === action.payload.boxId
      );

      const boundingBoxFileArray = state.boundingBox.filter(
        (box) => box.file.id === action.payload.fileId
      );

      boundingBoxFileArray.map(
        (box) => (box.file.properties.name = action.payload.fileName)
      );

      state.boundingBox[itemIdx].label.value = action.payload.label;
    },
    deleteBoundingBox: (state, action) => {
      const updatedBoundingBox = state.boundingBox.filter(
        (box) => box.id !== action.payload
      );

      state.boundingBox = updatedBoundingBox;
    },
  },
});

export const canvasActions = canvasSlice.actions;

export default canvasSlice.reducer;

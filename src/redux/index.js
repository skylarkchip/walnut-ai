import { configureStore } from "@reduxjs/toolkit";

// Reducers
import fileReducer from "./slices/file";
import labelsReducer from "./slices/labels";
import canvasReducer from "./slices/canvas";

const store = configureStore({
  reducer: {
    file: fileReducer,
    labels: labelsReducer,
    canvas: canvasReducer,
  },
});

export default store;

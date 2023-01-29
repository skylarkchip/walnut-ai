import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// FONTS
import "@fontsource/inter";

import { Provider } from "react-redux";

// Redux
import store from "./redux";
import RootLayout from "./pages/Root";

// Pages
import NotFoundPage from "./pages/NotFound";
import FileUploadPage from "./pages/FileUploadPage";
import EditorPage from "./pages/EditorPage";
import HistoryPage from "./pages/HistoryPage";
import TestPage from "./pages/TestPage";

const theme = extendTheme({
  fonts: {
    primary: "Inter, sans-serif",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <FileUploadPage />,
      },
      {
        path: "editor/:id",
        element: <EditorPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "test",
        element: <TestPage />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  );
};

export default App;

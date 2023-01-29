import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <Box as="main" bgColor="gray.50">
      <Outlet />
    </Box>
  );
};

export default RootLayout;

import React from "react";
import { Button } from "@chakra-ui/react";

const CustomButton = ({ type, onClick, children }) => {
  return (
    <Button
      bgColor="blackAlpha.200"
      borderRadius="base"
      color="blackAlpha.800"
      fontFamily="primary"
      fontWeight="normal"
      fontSize="md"
      px="14"
      size="md"
      type={type}
      variant="solid"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;

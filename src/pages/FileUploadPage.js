import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/ui/buttons/custom-button.component";
import FileUploadForm from "../components/ui/forms/file-upload-form.component";

const FileUploadPage = () => {
  const navigate = useNavigate();
  return (
    <Flex
      minH="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      rowGap="8"
    >
      <FileUploadForm />
      <Box my="4">
        <CustomButton onClick={() => navigate("history")} type="button">
          Check Previous Files
        </CustomButton>
      </Box>
    </Flex>
  );
};

export default FileUploadPage;

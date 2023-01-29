import React from "react";
import { Box, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { HiCloudUpload } from "react-icons/hi";

const FileUploadField = ({ setFieldValue }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
      "application/pdf": [],
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      setFieldValue("files", acceptedFiles);
    },
    multiple: false,
  });
  return (
    <Box {...getRootProps({ className: "dropzone" })} w="30rem">
      <Input {...getInputProps()} />
      <Flex
        alignItems="center"
        borderColor="gray.300"
        borderRadius="3xl"
        borderStyle="dashed"
        borderWidth="thin"
        flexDirection="column"
        rowGap="8"
        justifyContent="center"
        p="14"
        w="full"
      >
        <Text fontFamily="primary" fontSize="lg" color="gray.400">
          {isDragActive
            ? " Drop your files here"
            : "Drag and Drop or click to select your file"}
        </Text>

        <Icon as={HiCloudUpload} color="gray.400" boxSize="8" />
      </Flex>
    </Box>
  );
};

export default FileUploadField;

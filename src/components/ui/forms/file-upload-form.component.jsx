import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import CustomButton from "../buttons/custom-button.component";
import FileUploadField from "../fields/file-upload-field.component";
import { useDispatch } from "react-redux";
import { fileActions } from "../../../redux/slices/file";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const FileUploadForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ files: "" }}
      onSubmit={(values) => {
        const id = v4();
        values.files.map((file) =>
          dispatch(
            fileActions.addFile({
              id,
              path: URL.createObjectURL(file),
              properties: { name: file.name, size: file.size },
            })
          )
        );
        navigate(`editor/${id}`);
      }}
    >
      {(formik) => (
        <Box as="form" onSubmit={formik.handleSubmit} w="full">
          <VStack spacing="14">
            <FileUploadField setFieldValue={formik.setFieldValue} />
            {formik.values.files &&
              formik.values.files.map((file) => (
                <Text
                  fontFamily="primary"
                  textAlign="left"
                >{`Uploaded File: ${file.name}`}</Text>
              ))}
            <CustomButton type="submit">Submit</CustomButton>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default FileUploadForm;

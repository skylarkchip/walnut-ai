import React from "react";
import {
  Box,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Formik } from "formik";
import { HiPlus } from "react-icons/hi";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { labelsAction } from "../../../redux/slices/labels";
import { v4 } from "uuid";

const AddLabelForm = ({ setLabels }) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ label: "" }}
      validationSchema={Yup.object({
        label: Yup.string().required("Label must not be blank"),
      })}
      onSubmit={(values, { resetForm }) => {
        // setLabels((prevState) => [...prevState, values.label]);
        const uuid = v4();
        dispatch(
          labelsAction.addLabel({
            id: uuid,
            value: values.label,
          })
        );
        resetForm();
      }}
    >
      {(formik) => (
        <Box as="form" onSubmit={formik.handleSubmit}>
          <InputGroup overflow="hidden">
            <Field
              as={Input}
              name="label"
              id="label"
              type="text"
              _focusVisible={{ outline: "none" }}
              _focusWithin={{ outline: "none" }}
            />
            <InputRightElement>
              <IconButton
                type="submit"
                icon={<Icon as={HiPlus} boxSize="6" />}
                borderRadius="none"
              />
            </InputRightElement>
          </InputGroup>
          {/* <ErrorMessage
            name="label"
            render={(msg) => (
              <Text fontSize="xs" color="red">
                {msg}
              </Text>
            )}
          /> */}
        </Box>
      )}
    </Formik>
  );
};

export default AddLabelForm;

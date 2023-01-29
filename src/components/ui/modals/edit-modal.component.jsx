import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../../redux/slices/canvas";

const EditModal = ({ isOpen, onClose, boundingBoxId, box }) => {
  const dispatch = useDispatch();
  const boundingBox = useSelector((state) => state.canvas.boundingBox);
  const [currentBox, setCurrentBox] = useState(null);

  useEffect(() => {
    const box = boundingBox.filter((box) => box.id === boundingBoxId);
    setCurrentBox(box);
  }, [boundingBox, boundingBoxId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent borderRadius="lg" overflow="hidden">
        <ModalHeader
          fontFamily="primary"
          fontSize="md"
          fontWeight="normal"
          color="black"
          bgColor="gray.100"
        >
          Edit
        </ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody>
          <Formik
            initialValues={{
              fileName: box.filename,
              coordinates: `x: ${Math.round(box.x)} y: ${Math.round(box.y)}`,
              label: box.label,
            }}
            validationSchema={Yup.object({
              fileName: Yup.string()
                .required("Filename is required")
                .min(7, "Filename is too short")
                .max(14, "Filename is too long")
                .matches(".+.pdf$", "Filename must end in pdf"),
              label: Yup.string().required("Label is required"),
            })}
            onSubmit={(values) => {
              dispatch(
                canvasActions.updateBoundingBox({
                  boxId: box.id,
                  fileId: box.fileId,
                  fileName: values.fileName,
                  label: values.label,
                })
              );
              onClose();
            }}
          >
            {(formik) => (
              <Box as="form" py="4" onSubmit={formik.handleSubmit}>
                <Flex flexDirection="column" rowGap="8">
                  <FormControl
                    alignItems="center"
                    display="flex"
                    fontFamily="primary"
                  >
                    <FormLabel htmlFor="fileName" flex="0 1 50%">
                      Filename:
                    </FormLabel>
                    <VStack flex="0 1 50%">
                      <Field
                        as={Input}
                        name="fileName"
                        id="fileName"
                        borderRadius="none"
                      />
                      <ErrorMessage
                        name="fileName"
                        render={(msg) => (
                          <Text
                            fontFamily="primary"
                            fontSize="xs"
                            color="red"
                            marginTop="0"
                            float="right"
                          >
                            {msg}
                          </Text>
                        )}
                      />
                    </VStack>
                  </FormControl>
                  <FormControl
                    alignItems="center"
                    display="flex"
                    fontFamily="primary"
                  >
                    <FormLabel htmlFor="coordinates" flex="0 1 50%">
                      Bounding Box:
                    </FormLabel>
                    <Field
                      flex="0 1 50%"
                      as={Input}
                      name="coordinates"
                      id="coordinates"
                      isDisabled={true}
                      borderRadius="none"
                    />
                  </FormControl>
                  <FormControl
                    alignItems="center"
                    display="flex"
                    fontFamily="primary"
                  >
                    <FormLabel htmlFor="label" flex="0 1 50%">
                      Text:
                    </FormLabel>
                    <VStack flex="0 1 50%">
                      <Field
                        as={Input}
                        name="label"
                        id="label"
                        borderRadius="none"
                      />
                      <ErrorMessage
                        name="label"
                        render={(msg) => (
                          <Text
                            fontFamily="primary"
                            fontSize="xs"
                            color="red"
                            marginTop="0"
                            float="right"
                          >
                            {msg}
                          </Text>
                        )}
                      />
                    </VStack>
                  </FormControl>
                  <Flex w="full" columnGap="4" mt="8">
                    <Button
                      w="full"
                      type="button"
                      variant="solid"
                      fontFamily="primary"
                      fontSize="sm"
                      fontWeight="normal"
                      bgColor="gray.300"
                      color="black"
                      borderRadius="base"
                      onClick={() => onClose()}
                    >
                      Cancel
                    </Button>
                    <Button
                      w="full"
                      type="submit"
                      variant="solid"
                      fontFamily="primary"
                      fontSize="sm"
                      fontWeight="normal"
                      bgColor="black"
                      color="white"
                      borderRadius="base"
                    >
                      Submit
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;

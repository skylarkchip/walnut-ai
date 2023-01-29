import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { canvasActions } from "../../../redux/slices/canvas";

const DeleteAlertDialog = ({ isOpen, onClose, boxId }) => {
  const dispatch = useDispatch();
  const cancelRef = useRef();

  const onSubmitHandler = () => {
    dispatch(canvasActions.deleteBoundingBox(boxId));
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size="lg"
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader
          fontFamily="primary"
          fontWeight="normal"
          fontSize="lg"
          textAlign="center"
        >
          Confirmation
        </AlertDialogHeader>
        <AlertDialogBody py="8" textAlign="center" fontFamily="primary">
          Are you sure you want to delete this box?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Flex columnGap="4" w="full">
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
              type="button"
              variant="solid"
              fontFamily="primary"
              fontSize="sm"
              fontWeight="normal"
              bgColor="black"
              color="white"
              borderRadius="base"
              onClick={onSubmitHandler}
            >
              Submit
            </Button>
          </Flex>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlertDialog;

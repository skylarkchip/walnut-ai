import React from "react";
import { Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { HiCheckCircle, HiOutlineTrash } from "react-icons/hi";

// Redux
import { labelsAction } from "../../../redux/slices/labels";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../../redux/slices/canvas";

const LabelListItem = ({ label }) => {
  const dispatch = useDispatch();
  const selectedLabel = useSelector((state) => state.labels.selectedLabel);
  const currentBox = useSelector((state) => state.canvas.currentBox);

  const onLabelRemoveHandler = () => {
    dispatch(labelsAction.removeLabel(label.id));
  };

  const onLabelSelectHandler = () => {
    dispatch(labelsAction.setSelectedLabel(label));

    if (selectedLabel.id === label.id) {
      dispatch(labelsAction.setSelectedLabel(""));
      dispatch(canvasActions.clearCurrentBox());
    }
  };

  const onAddBoundingBoxHandler = () => {
    if (currentBox) {
      dispatch(canvasActions.addBoundingBox(currentBox));
      dispatch(labelsAction.setSelectedLabel(""));
    }
  };

  return (
    <Flex
      alignItems="center"
      borderColor={selectedLabel.id === label.id ? "red.200" : "transparent"}
      borderRadius="base"
      borderWidth={selectedLabel.id === label.id ? "1px" : "0"}
      justifyContent="space-between"
      p="2"
      w="full"
      onClick={onLabelSelectHandler}
      _hover={{ boxShadow: "base", cursor: "pointer" }}
    >
      <Text fontFamily="primary" fontSize="xs">
        {label.value}
      </Text>
      <Flex columnGap="1" alignItems="center">
        <IconButton
          bgColor="transparent"
          p="0"
          size="xs"
          icon={
            <Icon
              as={HiCheckCircle}
              boxSize="4"
              color="green.400"
              _hover={{ color: "green.200" }}
            />
          }
          onClick={onAddBoundingBoxHandler}
          isDisabled={selectedLabel.id !== label.id || !currentBox}
          _hover={{ bgColor: "transparent" }}
        />
        <IconButton
          bgColor="transparent"
          p="0"
          size="xs"
          icon={
            <Icon
              as={HiOutlineTrash}
              boxSize="4"
              color="red.400"
              _hover={{ color: "red.200" }}
            />
          }
          onClick={onLabelRemoveHandler}
          isDisabled={selectedLabel.id === label.id}
          _hover={{ bgColor: "transparent" }}
        />
      </Flex>
    </Flex>
  );
};

export default LabelListItem;

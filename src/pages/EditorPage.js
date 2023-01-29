import React from "react";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fileActions } from "../redux/slices/file";
import { labelsAction } from "../redux/slices/labels";

// Components
import EditorCanvas from "../components/canvas/editor-canvas.component";
import AddLabelForm from "../components/ui/forms/add-label-form.component";
import LabelList from "../components/ui/list/label-list.component";
import BoxList from "../components/ui/list/box-list.component";
import { useExistingBoundingBox } from "../hooks/checkExistingBoundingBox";

const EditorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const file = useSelector((state) => state.file.file);

  const params = useParams();

  const { isExisting, boundingBox } = useExistingBoundingBox(params.id);

  const onReturnNavigationHandler = () => {
    dispatch(fileActions.removeFile());
    dispatch(labelsAction.clearLabel());
    navigate("..", { replace: true });
  };

  return (
    <Flex minH="100vh">
      <Stack direction="row" w="full" minH="full">
        <Box flex="0 1 80%" position="relative">
          <EditorCanvas />
          <IconButton
            bgColor="white"
            borderRadius="full"
            boxShadow="lg"
            children={<Icon as={HiChevronLeft} boxSize="8" />}
            left="8"
            position="absolute"
            size="lg"
            top="8"
            onClick={onReturnNavigationHandler}
          />
        </Box>
        <Box
          flex="0 1 20%"
          borderLeftWidth="1px"
          borderColor="gray.200"
          bgColor="white"
          p="6"
        >
          <VStack spacing="8" align="left">
            <Text>
              Filename:{" "}
              {isExisting
                ? boundingBox[0].file.properties.name
                : file.properties.name}
            </Text>
            <Text>
              File Size:{" "}
              {isExisting
                ? boundingBox[0].file.properties.size
                : file.properties.size}
              bytes
            </Text>
            <AddLabelForm />
            <LabelList />
            <BoxList />
          </VStack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default EditorPage;

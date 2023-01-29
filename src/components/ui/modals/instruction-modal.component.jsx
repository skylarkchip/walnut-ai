import React, { useState } from "react";
import {
  Box,
  Heading,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

const InstructionModal = () => {
  const { onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(true);

  const onCloseModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModalHandler}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalHeader
          bgColor="gray.100"
          textAlign="center"
          fontFamily="primary"
          fontSize="lg"
          fontWeight="medium"
        >
          Welcome!
        </ModalHeader>
        <ModalCloseButton color="black" />
        <ModalBody py="8">
          <VStack spacing="6">
            <Heading
              as="h4"
              fontFamily="primary"
              fontSize="md"
              fontWeight="normal"
            >
              Please follow the guide below in order to start:
            </Heading>
            <Box w="full" px="6">
              <UnorderedList w="full" justifyContent="left" spacing="2">
                <ListItem>
                  <Text fontFamily="primary" fontSize="md">
                    Type and add a label using the '+' button
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="primary" fontSize="md">
                    It will be displayed inside the Labels box.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="primary" fontSize="md">
                    Choose a label in order to draw a box.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="primary" fontSize="md">
                    On your selected, click on the check icon to save your selected
                    box.
                  </Text>
                </ListItem>
                <ListItem>
                  <Text fontFamily="primary" fontSize="md">
                    To remove a label, click on the trash icon.
                  </Text>
                </ListItem>
              </UnorderedList>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InstructionModal;

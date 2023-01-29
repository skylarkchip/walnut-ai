import React from "react";
import { Flex, Heading, Icon, VStack } from "@chakra-ui/react";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/ui/buttons/custom-button.component";
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Flex minH="100vh" alignItems="center" justifyContent="center">
      <VStack spacing="10">
        <Icon as={VscDebugDisconnect} boxSize="8" color="gray.400" />
        <Heading as="h1" color="gray.400" fontWeight="md" fontSize="xl">
          Uh Oh! The page you&rsquo;re looking for is not found.
        </Heading>
        <CustomButton onClick={() => navigate("..", { replace: true })}>
          Return
        </CustomButton>
      </VStack>
    </Flex>
  );
};

export default NotFoundPage;

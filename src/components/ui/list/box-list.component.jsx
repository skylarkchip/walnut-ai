import React from "react";
import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BoxList = () => {
  const currentBox = useSelector((state) => state.canvas.currentBox);
  const boundingBox = useSelector((state) => state.canvas.boundingBox);
  const params = useParams();

  return (
    <Flex w="full" flexDirection="column" rowGap="4">
      <Heading as="h6" fontFamily="primary" fontWeight="semibold" fontSize="md">
        Bounding Boxes
      </Heading>
      <VStack spacing="4" maxH="20rem" overflowY="scroll" px="4">
        {boundingBox &&
          boundingBox.map((box) => (
            <React.Fragment key={box.id}>
              {box.file.id === params.id && (
                <Box p="4" borderWidth="1px" borderColor="gray.400" w="full">
                  <Text>Filename: {box.file.properties.name}</Text>
                  <Text>Label: {box.label.value}</Text>
                  <Text>Page: {box.page}</Text>
                  <Text>X: {box.boundingBox.x}</Text>
                  <Text>Y: {box.boundingBox.y}</Text>
                  <Image src={box.image} alt={box.label.value} loading="lazy" />
                </Box>
              )}
            </React.Fragment>
          ))}
      </VStack>
    </Flex>
  );
};

export default BoxList;

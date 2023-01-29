import React from "react";
import { Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BoxList = () => {
  const boundingBox = useSelector((state) => state.canvas.boundingBox);
  const params = useParams();

  return (
    <Flex w="full" flexDirection="column" rowGap="4">
      {boundingBox.length > 0 && (
        <>
          <Heading
            as="h6"
            fontFamily="primary"
            fontWeight="semibold"
            fontSize="md"
          >
            Bounding Boxes
          </Heading>
          <VStack spacing="4" maxH="20rem" overflowY="scroll" px="2">
            {boundingBox.map((box) => (
              <React.Fragment key={box.id}>
                {box.file.id === params.id && (
                  <VStack
                    p="4"
                    borderWidth="1px"
                    borderColor="gray.400"
                    w="full"
                    spacing="4"
                    align="left"
                  >
                    <Text>Filename: {box.file.properties.name}</Text>
                    <Text>Label: {box.label.value}</Text>
                    <Text>Page: {box.page}</Text>
                    <Text>X: {box.boundingBox.x}</Text>
                    <Text>Y: {box.boundingBox.y}</Text>
                    <Image
                      src={box.image}
                      alt={box.label.value}
                      loading="lazy"
                    />
                  </VStack>
                )}
              </React.Fragment>
            ))}
          </VStack>
        </>
      )}
    </Flex>
  );
};

export default BoxList;

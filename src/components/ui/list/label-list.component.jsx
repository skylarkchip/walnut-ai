import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";

// Redux
import { useSelector } from "react-redux";

// Components
import LabelListItem from "./label-list-item.component";

const LabelList = () => {
  const labels = useSelector((state) => state.labels.labels);

  return (
    <Flex w="full" flexDirection="column" rowGap="4">
      <Accordion
        allowToggle
        defaultIndex={[0]}
        borderWidth="1px"
        borderTopWidth="0"
        borderBottomWidth="0"
      >
        <AccordionItem>
          <AccordionButton bgColor="#EFEFEF">
            <Box as="span" flex="1" textAlign="left">
              <Text as="span" fontFamily="primary" fontWeight="semibold">
                Labels
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px="2" py="0">
            <VStack spacing="4" align="left" py="4">
              {labels.length < 1 && (
                <Box p="4">
                  <Text textAlign="center" fontFamily="primary">
                    Add Labels
                  </Text>
                </Box>
              )}
              {labels.length > 0 &&
                labels.map((label) => (
                  <LabelListItem key={label.id} label={label} />
                ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default LabelList;

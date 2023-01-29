import React, { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/ui/table/table.component";
import SearchField from "../components/ui/fields/searchfield.component";
import { useSelector } from "react-redux";

const HistoryPage = () => {
  const boundingBox = useSelector((state) => state.canvas.boundingBox);

  const [filteredBoundingBox, setFilteredBoundingBox] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredBoundingBox(boundingBox);
  }, [boundingBox]);

  const onReturnNavigationHandler = () => {
    navigate("..", { replace: true });
  };

  const onFilterHandler = (searchValue) => {
    const filteredBox = boundingBox.filter((box) =>
      box.file.properties.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredBoundingBox(filteredBox);
  };

  return (
    <Flex h="100vh" justifyContent="center" p="14">
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
      <Container maxW="5xl">
        <VStack rowGap="8">
          <SearchField onFilter={onFilterHandler} />
          {filteredBoundingBox.length < 1 && (
            <Flex h="30vh" alignItems="center" justifyContent="center">
              <Text fontFamily="primary" fontSize="2xl" color="gray.400">
                No Results Found
              </Text>
            </Flex>
          )}
          {filteredBoundingBox.length > 0 && (
            <TableComponent boundingBox={filteredBoundingBox} />
          )}
        </VStack>
      </Container>
    </Flex>
  );
};

export default HistoryPage;

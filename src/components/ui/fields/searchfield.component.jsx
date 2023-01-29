import React, { useState } from "react";
import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { HiSearch } from "react-icons/hi";

const SearchField = ({ onFilter }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <InputGroup>
      <Input
        borderRadius="none"
        bgColor="white"
        fontFamily="primary"
        type="text"
        placeholder="Search File..."
        onChange={(e) => setSearchValue(e.target.value)}
        _placeholder={{ color: "gray.400" }}
        _focusVisible={{ outline: "none" }}
      />
      <InputRightElement
        children={
          <IconButton
            icon={<Icon as={HiSearch} boxSize="6" color="white" />}
            borderRadius="none"
            onClick={() => onFilter(searchValue)}
            bgColor="black"
            _focusVisible={{ outline: "none" }}
            _hover={{ bgColor: "blackAlpha.400" }}
          />
        }
      />
    </InputGroup>
  );
};

export default SearchField;

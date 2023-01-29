import React from "react";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import TableDataRow from "./table-data-row.component";

const TableComponent = ({ boundingBox }) => {
  return (
    <Table bgColor="white" w="full" borderWidth="1px">
      <Thead>
        <Tr>
          <Th
            fontFamily="primary"
            fontWeight="semibold"
            fontSize="sm"
            textTransform="capitalize"
          >
            File Name
          </Th>
          <Th
            fontFamily="primary"
            fontWeight="semibold"
            fontSize="sm"
            textTransform="capitalize"
          >
            Bounding Boxes
          </Th>
          <Th
            fontFamily="primary"
            fontWeight="semibold"
            fontSize="sm"
            textTransform="capitalize"
          >
            Text
          </Th>
          <Th
            fontFamily="primary"
            fontWeight="semibold"
            fontSize="sm"
            textTransform="capitalize"
          >
            Actions
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {boundingBox.length > 0 &&
          boundingBox.map((box, idx) => (
            <TableDataRow key={box.id} box={box} />
          ))}
      </Tbody>
    </Table>
  );
};

export default TableComponent;

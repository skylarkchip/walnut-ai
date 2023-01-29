import React, { useState } from "react";
import { Flex, Icon, IconButton, Td, Text, Tr } from "@chakra-ui/react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import EditModal from "../modals/edit-modal.component";
import DeleteAlertDialog from "../modals/delete-alert-dialog.component";

const TableDataRow = (props) => {
  const { box } = props;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const onEditModalHandler = () => {
    setIsEditOpen(!isEditOpen);
  };

  const onDeleteModalHandler = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  return (
    <Tr textAlign="center">
      <Td>
        <Text as="span" fontFamily="primary">
          {box.file.properties.name}
        </Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="primary">
          x:{Math.round(box.boundingBox.x)} y:
          {Math.round(box.boundingBox.y)}
        </Text>
      </Td>
      <Td>
        <Text as="span" fontFamily="primary">
          {box.label.value}
        </Text>
      </Td>
      <Td>
        <Flex>
          <IconButton
            bgColor="transparent"
            icon={
              <Icon
                as={HiOutlinePencilAlt}
                boxSize="4"
                _hover={{ color: "green.400" }}
              />
            }
            _hover={{ bgColor: "transparent" }}
            onClick={onEditModalHandler}
          />
          <EditModal
            isOpen={isEditOpen}
            onClose={setIsEditOpen}
            boundingBoxId={box.id}
            box={{
              id: box.id,
              x: box.boundingBox.x,
              y: box.boundingBox.y,
              fileId: box.file.id,
              filename: box.file.properties.name,
              label: box.label.value,
            }}
          />
          <IconButton
            bgColor="transparent"
            icon={
              <Icon
                as={HiOutlineTrash}
                boxSize="4"
                _hover={{ color: "red.400" }}
              />
            }
            _hover={{ bgColor: "transparent" }}
            onClick={onDeleteModalHandler}
          />
          <DeleteAlertDialog
            isOpen={isDeleteOpen}
            onClose={setIsDeleteOpen}
            boxId={box.id}
          />
        </Flex>
      </Td>
    </Tr>
  );
};

export default TableDataRow;

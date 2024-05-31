import { Avatar, Box, HStack, Icon, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";


const CompletedSaleOrdersTabPannel = ({editOrViewOnOpen}) => {
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Customer Name</Th>
              <Th>Price (&#8377;)</Th>
              <Th>Last modified</Th>
              <Th>Edit/View</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>1234</Td>
              <Td>
                <HStack>
                  <Avatar src="" size="xs" bg="blue.500" />
                  <Box>Name One Completed</Box>
                </HStack>
              </Td>
              <Td>&#8377; 300</Td>
              <Td>29/05/2024</Td>
              <Td>
                <IconButton
                  bg="none"
                  aria-label="edit or view"
                  icon={<Icon as={BsThreeDots} />}
                  onClick={editOrViewOnOpen}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CompletedSaleOrdersTabPannel;

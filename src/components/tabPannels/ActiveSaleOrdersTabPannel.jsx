import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import saleOrders from "../../db/saleOrders.json";
import customers from "../../db/customers.json";
import { useContext, useEffect } from "react";
import { SaleOrderContext } from "../../contexts/SaleOrderContext";

const ActiveSaleOrdersTabPannel = ({ editOrViewOnOpen }) => {
  const { setSaleOrder } = useContext(SaleOrderContext);

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
            {saleOrders.map((saleOrder, index) => {
              if (saleOrder.paid === true) {
                return (
                  <Tr key={index}>
                    <Td>{saleOrder.customer_id}</Td>
                    <Td>
                      <HStack>
                        <Avatar src="" size="xs" bg="blue.500" />
                        <Box>
                          {
                            customers?.find(
                              (customer) =>
                                customer.customer_profile.id ===
                                saleOrder.customer_id
                            ).customer_profile.name
                          }
                        </Box>
                      </HStack>
                    </Td>
                    <Td>
                      &#8377;
                      {saleOrder?.items?.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )}
                    </Td>
                    <Td>{saleOrder?.invoice_date}</Td>
                    <Td>
                      <IconButton
                        bg="none"
                        aria-label="edit or view"
                        icon={<Icon as={BsThreeDots} />}
                        onClick={() => {
                          setSaleOrder(saleOrder);
                          editOrViewOnOpen();
                        }}
                      />
                    </Td>
                  </Tr>
                );
              }
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ActiveSaleOrdersTabPannel;

import {
  Box,
  Button,
  Flex,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  IconButton,
  Icon,
  Td,
  HStack,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import SaleOrderModal from "../components/modals/SaleOrderModal";
import getAllSaleOrders from "../utils/api/getAllSaleOrders";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { SaleOrderContext } from "../contexts/SaleOrderContext";
import getAllCustomers from "../utils/api/getAllCustomers";

const SaleOrders = () => {
  const { setSaleOrder } = useContext(SaleOrderContext);

  const {
    isOpen: addSaleOrderIsOpen,
    onOpen: addSaleOrderOnOpen,
    onClose: addSaleOrderOnClose,
  } = useDisclosure();

  const {
    isOpen: editSaleOrderIsOpen,
    onOpen: editSaleOrderOnOpen,
    onClose: editSaleOrderOnClose,
  } = useDisclosure();

  const {
    isOpen: viewSaleOrderIsOpen,
    onOpen: viewSaleOrderOnOpen,
    onClose: viewSaleOrderOnClose,
  } = useDisclosure();

  const {
    data: saleOrders,
    isPending: saleOrdersPending,
    error: saleOrdersError,
  } = useQuery({
    queryKey: ["saleorders"],
    queryFn: getAllSaleOrders,
  });

  const {
    data: customers,
    isPending: customersPending,
    error: customersError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });

  // if(saleOrders) {
  //   console.log("saleOrders length: ", saleOrders.length)
  // }

  return (
    <>
      <Flex direction="column" h="100vh" p="2em">
        <Flex direction="row-reverse">
          <Button
            colorScheme="blue"
            onClick={addSaleOrderOnOpen}
            mb="1em"
            w="fit-content"
          >
            + Sale Order
          </Button>
        </Flex>
        <Box w="100%">
          <Tabs variant="enclosed">
            <TabList>
              <Tab _selected={{ bg: "blue.500", color: "white" }}>
                Active Sale Orders
              </Tab>
              <Tab _selected={{ bg: "blue.500", color: "white" }}>
                Completed Sale Orders
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* Active Sale Orders */}
                {saleOrdersPending || customersPending ? (
                  <Flex minH="70vh" justify="center" alignItems="center">

                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="xl"
                    />
                  </Flex>
                ) : saleOrdersError || customersError ? (
                  <Flex minH="70vh" justify="center" alignItems="center">
                    "An error occured"
                  </Flex>
                ) : (
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
                        {saleOrders?.map((saleOrder, index) => {
                          if (saleOrder.paid !== true) {
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
                                    (acc, item) =>
                                      acc + item.price * item.quantity,
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
                                      editSaleOrderOnOpen();
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
                )}
              </TabPanel>

              <TabPanel>
                {/* Completed Sale Orders */}
                {saleOrdersPending || customersPending ? (
                  "Pending..."
                ) : saleOrdersError || customersError ? (
                  "Error"
                ) : (
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
                        {saleOrders?.map((saleOrder, index) => {
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
                                    (acc, item) =>
                                      acc + item.price * item.quantity,
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
                                      viewSaleOrderOnOpen();
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
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        <SaleOrderModal
          add
          isOpen={addSaleOrderIsOpen}
          onClose={addSaleOrderOnClose}
        />

        <SaleOrderModal
          edit
          isOpen={editSaleOrderIsOpen}
          onClose={editSaleOrderOnClose}
        />

        <SaleOrderModal
          view
          isOpen={viewSaleOrderIsOpen}
          onClose={viewSaleOrderOnClose}
        />
      </Flex>
    </>
  );
};

export default SaleOrders;

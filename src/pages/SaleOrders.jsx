import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Icon,
  IconButton,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import AddSaleOrderModal from "../components/modals/AddSaleOrderModal";
import EditORViewSaleOrderModal from "../components/modals/EditORViewSaleOrderModal";
import ActiveSaleOrdersTabPannel from "../components/tabPannels/ActiveSaleOrdersTabPannel";
import CompletedSaleOrdersTabPannel from "../components/tabPannels/CompletedSaleOrdersTabPannel";
import SaleOrderModal from "../components/modals/SaleOrderModal";

const SaleOrders = () => {
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
                <ActiveSaleOrdersTabPannel
                  editOrViewOnOpen={editSaleOrderOnOpen}
                />
              </TabPanel>
              <TabPanel>
                <CompletedSaleOrdersTabPannel
                  editOrViewOnOpen={editSaleOrderOnOpen}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        {/* <AddSaleOrderModal
          isOpen={addSaleOrderIsOpen}
          onClose={addSaleOrderOnClose}
        /> */}

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
      </Flex>
    </>
  );
};

export default SaleOrders;

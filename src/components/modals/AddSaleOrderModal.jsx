import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { MultiSelect } from "chakra-multiselect";
import { useEffect, useState } from "react";
import products from "../../db/products.json";
import customers from "../../db/customers.json";
import ProductSkuCard from "../ProductSkuCard";

function AddSaleOrderModal({ isOpen, onClose }) {
  // useEffect(() => {
  //   console.log(productOptions)
  // }, [])

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [paymentStatusRadioValue, setPaymentStatusRadioValue] =
    useState("unpaid");

  const productOptions = products.map((product) => {
    return {
      id: product.id.toString(),
      value: product.name,
      label: product.name,
    };
  });

  const customerOptions = customers.map((customer) => {
    return {
      id: customer.id.toString(),
      value: `${customer.customer_profile.name}  (${customer.customer_profile.email})`,
      label: `${customer.customer_profile.name}  (${customer.customer_profile.email})`,
    };
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent minHeight="80vh">
          <ModalHeader>New Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="invoice-number">Invoice No.</FormLabel>
            <Input
              id="invoice-number"
              value="Invoice-123456"
              size="md"
              type="text"
              readOnly={true}
            />

            <MultiSelect
              placeholder="Choose customer"
              options={customerOptions}
              value={selectedCustomer}
              label="Select customer"
              onChange={setSelectedCustomer}
              single
            />

            <FormLabel htmlFor="dateInput">Date</FormLabel>
            <Input
              id="dateInput"
              placeholder="Select Date"
              size="md"
              type="date"
            />
            <MultiSelect
              placeholder="Select product(s)"
              options={productOptions}
              value={selectedProducts}
              label="All Products"
              onChange={setSelectedProducts}
            />

            <Box p="1em">
              {/* Show sku details */}
              {selectedProducts.map((item) => {
                const productId = Number(item.id);

                // find the product
                const product = products.find(
                  (product) => product.id == productId
                );

                const defaultIndexes = selectedProducts.map(
                  (item, index) => index
                );
                return (
                  <Accordion defaultIndex={defaultIndexes} allowMultiple>
                    <AccordionItem id={product.id}>
                      <h2>
                        <AccordionButton>
                          <Box as="span" flex="1" textAlign="left">
                            {product.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        {product.sku.map((sku, index) => (
                          <ProductSkuCard key={sku.id} sku={sku} idx={index} />
                        ))}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                );
              })}
            </Box>

            <FormLabel htmlFor="payment-status">Payment Status</FormLabel>
            <RadioGroup
              id="payment-status"
              onChange={setPaymentStatusRadioValue}
              value={paymentStatusRadioValue}
            >
              <Stack direction="row">
                <Radio value="paid">Paid</Radio>
                <Radio value="unpaid">Unpaid</Radio>
              </Stack>
            </RadioGroup>
          </ModalBody>

          {/* <Button onClick={()=> console.log(selectedProducts)}>Check</Button> */}
          <ModalFooter>
            <Flex justify="center" w="100%">
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Save
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddSaleOrderModal;

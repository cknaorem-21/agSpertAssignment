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
import { useContext, useEffect, useState } from "react";
import products from "../../db/products.json";
import customers from "../../db/customers.json";
import ProductSkuCard from "../ProductSkuCard";
import { SaleOrderContext } from "../../contexts/SaleOrderContext";

function SaleOrderModal({ isOpen, onClose, add, edit, view }) {
  const { saleOrder, setSaleOrder } = useContext(SaleOrderContext);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const [paymentStatusRadioValue, setPaymentStatusRadioValue] = useState(() =>
    add ? "unpaid" : saleOrder?.paid ? "paid" : "unpaid"
  );

  // (for edit mode)
  useEffect(() => {
    if (saleOrder) {
      const productsInSaleOrder = new Set();
  
      // finding product of the corresponding sku
      saleOrder.items.forEach((item) => {
        let productFound = null;
  
        for (let product of products) {
          if (product.sku.some((sku) => sku.id === item.sku_id)) {
            productFound = product;
            break;
          }
        }
  
        // adding every product found to the set
        if (productFound) {
          productsInSaleOrder.add(productFound);
        }
      });
      
      // forming array from the set
      const saleOrderProducts = Array.from(productsInSaleOrder);
  
      // finding customer to be selected in the multiselect(single) from saleOrder customer_id
      const customerToSelect = customerOptions.find(
        (option) => option.id == saleOrder.customer_id
      );
      setSelectedCustomer(customerToSelect);

      // finding products to be selected in the multiselect from saleOrderProsucts
      const productsToSelect = productOptions.filter((option) =>
        saleOrderProducts.some((product) => product.id == option.id)
      );
      setSelectedProducts(productsToSelect);
    }
  }, [saleOrder]);

  // product options for multiselect
  const productOptions = products.map((product) => {
    return {
      id: product.id,
      value: product.name,
      label: product.name,
    };
  });

  // customer options for multiselect(single) 
  const customerOptions = customers.map((customer) => {
    return {
      id: customer.customer_profile.id,
      value: `${customer.customer_profile.name}  (${customer.customer_profile.email})`,
      label: `${customer.customer_profile.name}  (${customer.customer_profile.email})`,
    };
  });

  // celaring out customer and products selected for add sale order mode
  useEffect(()=>{
    if(add) {
      setSelectedCustomer("") 
      setSelectedProducts([])
    }
  })
  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={()=> {
          setSaleOrder(null)
          onClose()
        }} 
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent minHeight="80vh">
          <ModalHeader>
            {add ? "New Sale Order" : edit ? "Edit Sale Order" : "Sale Order"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel htmlFor="invoice-number">Invoice No.</FormLabel>
            <Input
              id="invoice-number"
              value={saleOrder ? saleOrder.invoice_no : "Invoice-Dummy12345"}
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
              {
              selectedProducts?.map((item) => {
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
                    <AccordionItem>
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
              <Button colorScheme="blue" mr={3}>
                {add ? "Save" : edit ? "Update" : "Close"}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SaleOrderModal;

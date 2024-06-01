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
import ProductSkuCard from "../ProductSkuCard";
import { SaleOrderContext } from "../../contexts/SaleOrderContext";
import getAllProducts from "../../utils/api/getAllProducts";
import getAllCustomers from "../../utils/api/getAllCustomers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getInvoiceNumber from "../../utils/getInvoiceNumber"
import addNewSaleOrder from "../../utils/api/addNewSaleOrder";
import { useForm } from "react-hook-form";

function SaleOrderModal({ isOpen, onClose, add, edit, view }) {
  let invoiceNumber
  if(add) {
    invoiceNumber = getInvoiceNumber() 
  }

  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    customer_id: "",
    items: [],
    paid: false,
    invoice_no: invoiceNumber,
    invoice_date: ""
  });
  
  
  
  const { saleOrder, setSaleOrder } = useContext(SaleOrderContext);
  
  useEffect(()=>{
    if(saleOrder) {
      setFormData({
        customer_id: saleOrder.customer_id,
        items: saleOrder.items,
        paid: saleOrder.paid,
        invoice_no: saleOrder.invoice_no,
        invoice_date: saleOrder.invoice_date
      })
    }
  }, [saleOrder])

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState();
  
  const [paymentStatusRadioValue, setPaymentStatusRadioValue] = useState(() =>
    add ? "unpaid" : saleOrder?.paid ? "paid" : "unpaid"
);

const {
  data: products,
  isPending: productsPending,
  error: productsError,
} = useQuery({
  queryKey: ["products"],
  queryFn: getAllProducts,
});

const {
  data: customers,
  isPending: customersPending,
  error: customersError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });

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
  const productOptions = products?.map((product) => {
    return {
      id: product.id,
      value: product.name,
      label: product.name,
    };
  });

  // customer options for multiselect(single)
  const customerOptions = customers?.map((customer) => {
    return {
      id: customer.customer_profile.id,
      value: `${customer.customer_profile.name}  (${customer.customer_profile.email}) ${customer.customer_profile.id}`,
      label: `${customer.customer_profile.name}  (${customer.customer_profile.email}) ${customer.customer_profile.id}`,
    };
  });

  // celaring out customer and products selected for add sale order mode
  useEffect(() => {
    if (add) {
      setSelectedCustomer("");
      setSelectedProducts([]);
    }
  }, [saleOrder]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      return addNewSaleOrder(data)
      
    },
    onSuccess: (user) => {
      if (user) {
        queryClient.invalidateQueries(["saleorders"]);
        onClose()
      } else {
        alert("Something went wrong");
      }
    },
    onError: (error) => {
      alert("Error adding sale order. Try again")
      console.error("Error adding sale order", error);
    }
  });

  const onSubmit = async (data) => {
    mutation.mutate(formData)
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setSaleOrder(null);
          onClose();
        }}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent minHeight="80vh">
          <ModalHeader>
            {add ? "New Sale Order" : edit ? "Edit Sale Order" : "Sale Order"}
          </ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <ModalBody>
              <FormLabel htmlFor="invoice-number">Invoice No.</FormLabel>
              <Input
                id="invoice-number"
                value={saleOrder ? saleOrder.invoice_no : invoiceNumber}
                size="md"
                type="text"
                readOnly={true}
              />

              {view ? (
                <>
                  <FormLabel htmlFor="customer">Customer</FormLabel>
                  <Input
                    id="customer"
                    value={selectedCustomer?.value}
                    size="md"
                    type="text"
                    readOnly={true}
                  />
                </>
              ) : (
                <MultiSelect
                  placeholder="Choose customer"
                  options={customerOptions}
                  value={selectedCustomer}
                  label="Select customer"
                  // onChange={setSelectedCustomer}
                  onChange={(customer) => {
                    const parts = customer.split(" ")
                    const id = Number(parts[parts.length-1])
                    setSelectedCustomer(customer);
                    setFormData((prev) => ({ ...prev, customer_id: id }));
                  }}
                  single
                />
              )}

              <FormLabel htmlFor="dateInput">Date</FormLabel>
              <Input
                id="dateInput"
                placeholder="Select Date"
                size="md"
                type="date"
                onChange={(e) => {
                  const [year, month, day] = e.target.value.split("-")
                  setFormData({ ...formData, invoice_date: `${day}/${month}/${year}`})
                }
                }
                readOnly={view}
              />

              {view ? (
                <>
                  <FormLabel htmlFor="selectedproducts">
                    Selected Products
                  </FormLabel>
                  <Flex gap="0.5em">
                    {selectedProducts.map((productItem) => {
                      return (
                        <Badge
                          textTransform="none"
                          bg="gray.500"
                          color="white"
                          px="1em"
                          py="0.2em"
                          borderRadius="1000px"
                        >
                          {productItem.value}
                        </Badge>
                      );
                    })}
                  </Flex>
                </>
              ) : (
                <MultiSelect
                  placeholder="Select product(s)"
                  options={productOptions}
                  value={selectedProducts}
                  label="All Products"
                  onChange={setSelectedProducts}
                  readOnly={view}
                />
              )}

              <Box p="1em">
                {/* Show sku details */}
                {selectedProducts?.map((item) => {
                  const productId = Number(item.id);

                  // find the product
                  const product = products.find(
                    (product) => product.id == productId
                  );

                  const defaultIndexes = selectedProducts.map(
                    (item, index) => index
                  );
                  return (
                    // selected products accordion
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
                          {product.sku.map((sku, index) =>
                            view ? (
                              <ProductSkuCard
                                key={sku.id}
                                sku={sku}
                                idx={index}
                                setFormData={setFormData}
                                view
                              />
                            ) : (
                              <ProductSkuCard
                                key={sku.id}
                                sku={sku}
                                idx={index}
                                setFormData={setFormData}
                              />
                            )
                          )}
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
              </Box>

              <FormLabel htmlFor="payment-status">Payment Status</FormLabel>
              {view ? (
                <Badge colorScheme="green">Paid</Badge>
              ) : (
                <RadioGroup
                  id="payment-status"
                  // onChange={setPaymentStatusRadioValue}
                  onChange={(status) => {
                    setPaymentStatusRadioValue(status)
                    setFormData((prev) => ({ ...prev, paid: status === "paid"? true: false }));
                  }}
                  value={paymentStatusRadioValue}
                >
                  <Stack direction="row">
                    <Radio value="paid">Paid</Radio>
                    <Radio value="unpaid">Unpaid</Radio>
                  </Stack>
                </RadioGroup>
              )}
            </ModalBody>

            <ModalFooter>
              <Flex justify="center" w="100%">
                {
                  view ? (
                    <Button onClick={onClose} colorScheme="blue" mr={3}>
                      Close
                    </Button>
                  ):(
                    <Button type="submit" colorScheme="blue" mr={3} isLoading={mutation.isPending}>
                      {add ? "Save" : "Update"}
                    </Button>
                  )  
                }
              </Flex>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SaleOrderModal;

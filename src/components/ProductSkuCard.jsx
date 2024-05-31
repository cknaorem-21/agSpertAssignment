import { Badge, Box, Divider, Flex, FormControl, FormHelperText, FormLabel, Input, Spacer } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { SaleOrderContext } from "../contexts/SaleOrderContext";

const ProductSkuCard = ({ sku, idx }) => {
  const {saleOrder, setSaleOrder} = useContext(SaleOrderContext);
  const [sellingRate, setSellingRate] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  const getSellingRate = () => {
    if (!saleOrder) {
      return 0;
    } else {
      for (let item of saleOrder.items) {
        if (item.sku_id === sku.id) return item.price;
      }
    }
  };

  const getTotalItems = () => {
    if (!saleOrder) {
      return 0;
    } else {
      for (let item of saleOrder.items) {
        if (item.sku_id === sku.id) return item.quantity;
      }
    }
  };

  // update price and quantity
  useEffect(() => {
    setSellingRate(getSellingRate());
    setTotalItems(getTotalItems());
  }, [saleOrder, sku.id]);

  return (
    <Box
      border="1px"
      borderColor="gray.300"
      shadow="md"
      borderRadius="md"
      mb="0.5em"
      p="0.5em"
    >
      <Flex alignItems="center" fontWeight="700">
        <Box>
          {idx + 1}. SKU {sku.id} ({sku.amount} {sku.unit})
        </Box>
        <Spacer />
        <Badge h="fit-content" textTransform="none">
          Rate: &#8377; {sku.selling_price}
        </Badge>
      </Flex>

      <Divider my="0.5em" />

      <Flex gap="1em">
        <FormControl>
          <FormLabel>Selling Rate</FormLabel>
          <Input 
            type="number"
            value={sellingRate}
            onChange={()=> console.log("onChange")}
            placeholder="Enter selling rate" 
          />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>

        <FormControl>
          <FormLabel>Total Items</FormLabel>
          <Input 
            type="email"
            value={totalItems}
            onChange={()=> console.log("onChange")}
            placeholder="Enter quantity" 
          />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>
      </Flex>

      <Flex mt="0.5em">
        <Spacer />
        <Badge
          colorScheme="green"
          textTransform="none"
          borderRadius="10px"
          px="0.5em"
        >
          {sku.quantity_in_inventory} Item(s) remaining
        </Badge>
      </Flex>
    </Box>
  );
};

export default ProductSkuCard;

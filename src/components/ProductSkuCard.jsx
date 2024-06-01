import {
  Badge,
  Box,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { memo, useContext, useEffect, useState } from "react";
import { SaleOrderContext } from "../contexts/SaleOrderContext";

const ProductSkuCard = ({ sku, idx, view, setFormData }) => {
  const { saleOrder, setSaleOrder } = useContext(SaleOrderContext);
  const [sellingRate, setSellingRate] = useState();
  const [totalItems, setTotalItems] = useState();

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

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent the default behavior of the wheel event
  };

  // update price and quantity (view/edit)
  useEffect(() => {
    setSellingRate(getSellingRate());
    setTotalItems(getTotalItems());
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      // setFormData
      setFormData((prev) => {
        const existingItem = prev.items.find(
          (skuItem) => skuItem.sku_id === sku.id
        );
        if (existingItem)
          return {
            ...prev,
            items: prev.items.map((item) =>
              item.sku_id === sku.id
                ? { ...item, price: sellingRate, quantity: totalItems }
                : item
            ),
          };
        else
          return {
            ...prev,
            items: [
              ...prev.items,
              { sku_id: sku.id, price: sellingRate, quantity: totalItems },
            ],
          };
      });
    }
  }, [sellingRate, totalItems, sku.id, setFormData]);

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
            min={0}
            onChange={(e) => {
              setSellingRate(e.target.value);
            }}
            placeholder="Enter selling rate"
            readOnly={view}
          />
          {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
        </FormControl>

        <FormControl>
          <FormLabel>Total Items</FormLabel>
          <Input
            type="number"
            value={totalItems}
            min={0}
            onChange={(e) => setTotalItems(e.target.value)}
            placeholder="Enter quantity"
            readOnly={view}
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

export default memo(ProductSkuCard);

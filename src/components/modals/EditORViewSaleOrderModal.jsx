import { 
  Button,
  Flex,
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay,
} from "@chakra-ui/react";
import { useContext } from "react";
import { SaleOrderContext } from "../../contexts/SaleOrderContext";

const EditORViewSaleOrderModal = ({ isOpen, onClose }) => {
  const {saleOrder} = useContext(SaleOrderContext)

  console.log("saleOrder", saleOrder)
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent minHeight="80vh">
        <ModalHeader>Sale Order</ModalHeader>
        <ModalCloseButton />

        <ModalBody>Some body text</ModalBody>

        <ModalFooter>
          <Flex justify="center" w="100%">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Save
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditORViewSaleOrderModal;

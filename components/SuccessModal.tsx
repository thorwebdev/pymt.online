import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import {
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link,
  Icon,
} from "@chakra-ui/core";
import { useManageCart } from "../utils/cart-manager";

export default function SuccessModal({ account, success }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { clearCart } = useShoppingCart();
  const { clearMerchant } = useManageCart();

  useEffect(() => {
    if (success !== undefined) {
      clearCart();
      clearMerchant();
      onOpen();
    }
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Thanks for your purchase!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              You will receive an email receipt shortly. If you have any
              questions, please{" "}
              <Link href={`mailto:${account.email}`} isExternal>
                contact <Icon name="external-link" mx="2px" />
              </Link>{" "}
              the merchant.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={account?.branding?.secondary_color ?? "secondary"}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

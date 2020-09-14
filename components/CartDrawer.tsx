import React from "react";
import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@chakra-ui/core";
import { useShoppingCart } from "use-shopping-cart";
import CartSummary from "./CartSummary";

export default function CartDrawer({ account }) {
  const { cartCount } = useShoppingCart();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        ref={btnRef}
        bg={account?.branding?.secondary_color ?? "secondary"}
        onClick={onOpen}
      >
        {`Cart (${cartCount})`}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`Cart (${cartCount})`}</DrawerHeader>

          <DrawerBody>
            <CartSummary merchant={account.id} />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Clear
            </Button>
            <Button bg={account?.branding?.secondary_color ?? "secondary"}>
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

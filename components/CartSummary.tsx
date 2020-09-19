import React, { useState, useEffect } from "react";
import Link from "next/link";

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
  Flex,
  Text,
  Divider,
  Image,
  IconButton,
  Box,
  Select,
} from "@chakra-ui/core";

import { useShoppingCart } from "use-shopping-cart";
import { useManageCart } from "../utils/cart-manager";
import { fetchPostJSON } from "../utils/helpers";

const CartSummary = ({ account }) => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    removeItem,
    setItemQuantity,
  } = useShoppingCart();
  const { currentMerchant, clearMerchant } = useManageCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleCheckout = async (event) => {
    setLoading(true);

    const response = await fetchPostJSON("api/checkout", {
      cartItems: cartDetails,
      merchant: account.id,
    });

    redirectToCheckout({ sessionId: response.id });
  };

  const DifferentMerchant = () => (
    <>
      <DrawerBody>
        <span>
          {`You already have a cart session with a `}
          <Link href={`/${currentMerchant}`}>
            <a>different merchant.</a>
          </Link>
        </span>
      </DrawerBody>
      <DrawerFooter>
        <Button
          variant="outline"
          mr={3}
          onClick={() => {
            clearCart();
            clearMerchant();
          }}
        >
          Clear
        </Button>
      </DrawerFooter>
    </>
  );

  const CartCheckout = () => (
    <>
      <DrawerBody>
        <Flex justify="space-between">
          <Text as="strong">{`Total (${cartCount} item${
            cartCount > 1 ? "s" : ""
          })`}</Text>
          <Text as="strong">{formattedTotalPrice}</Text>
        </Flex>
        <Button
          mt={4}
          width="full"
          bg={account?.branding?.secondary_color ?? "secondary"}
          onClick={handleCheckout}
          isDisabled={cartEmpty || loading}
        >
          Checkout
        </Button>
        <Divider />
        <Text as="strong">{account.name}</Text>
        <Divider />
        {Object.entries(cartDetails).map((item) => (
          <Flex key={item[0]} mt={4} justify="space-between">
            <Image
              mr={1}
              size="50px"
              src={item[1].image}
              fallbackSrc="https://via.placeholder.com/50"
            />
            <Box>
              <Flex justify="space-between">
                <Text mr={1}>{item[1].name}</Text>
                <Text mr={1} as="strong">
                  {item[1].formattedValue}
                </Text>
              </Flex>
              <Select
                placeholder="Quantity"
                size="sm"
                defaultValue={item[1].quantity}
                onChange={(e) => {
                  setItemQuantity(item[0], Number(e.target.value));
                }}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Select>
            </Box>
            <IconButton
              aria-label="Remove item from cart"
              icon="close"
              variant="outline"
              onClick={() => removeItem(item[0])}
            />
          </Flex>
        ))}
      </DrawerBody>

      <DrawerFooter>
        <Button
          variant="outline"
          mr={3}
          onClick={() => {
            clearCart();
            clearMerchant();
          }}
        >
          Clear
        </Button>
        <Button
          bg={account?.branding?.secondary_color ?? "secondary"}
          onClick={handleCheckout}
          isDisabled={cartEmpty || loading}
        >
          Checkout
        </Button>
      </DrawerFooter>
    </>
  );

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

          {currentMerchant && account.id !== currentMerchant ? (
            <DifferentMerchant />
          ) : (
            <CartCheckout />
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartSummary;

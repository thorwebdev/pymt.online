import React, { useState, useEffect } from "react";
import NextLink from "next/link";

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
  FormControl,
  FormLabel,
} from "@chakra-ui/core";

import { useShoppingCart } from "use-shopping-cart";
import { useManageCart } from "../utils/cart-manager";
import { fetchPostJSON } from "../utils/helpers";
import allShippingCountries from "../utils/shippingCountries.json";

const CartSummary = ({ account }) => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const [shippingCountry, setShippingCountry] = useState([
    account.country,
    allShippingCountries[account.country],
  ]);
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
  const [checkoutBlocked, setCheckoutBlocked] = useState(false);
  useEffect(() => {
    setCheckoutBlocked(false);
    Object.entries(cartDetails).forEach((item) => {
      const shippingMetadata = item[1].description;
      if (shippingMetadata) {
        const shippingCountries = shippingMetadata
          .replace(/\s/g, "")
          .split(",");
        if (
          !(shippingCountries[0].toUpperCase() === "ALL") &&
          !shippingCountries.find(
            (c) => c.toUpperCase() === shippingCountry[0].toUpperCase()
          )
        ) {
          setCheckoutBlocked(true);
        }
      }
    });
  }, [cartDetails, shippingCountry]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const handleCheckout = async (event) => {
    setLoading(true);

    const response = await fetchPostJSON("/api/checkout", {
      cartItems: cartDetails,
      shippingCountries: [shippingCountry[0]],
      merchant: account.id,
    });

    redirectToCheckout({ sessionId: response.id });
  };

  const DifferentMerchant = () => (
    <>
      <DrawerBody>
        <Text>You already have a cart with a different merchant!</Text>
        <Divider />
        <NextLink href={`/${currentMerchant}`} passHref>
          <Button
            as="a"
            mt={4}
            width="full"
            bg={account?.branding?.secondary_color ?? "secondary"}
          >
            Go to merchant
          </Button>
        </NextLink>
        <Button
          mt={4}
          width="full"
          variant="outline"
          onClick={() => {
            clearCart();
            clearMerchant();
          }}
        >
          Clear cart
        </Button>
      </DrawerBody>
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
        <FormControl mt={2}>
          <FormLabel htmlFor="quantity">Ship to:</FormLabel>
          <Select
            id="quantity"
            mt={2}
            placeholder="Ship to:"
            defaultValue={shippingCountry[0]}
            onChange={(e) =>
              setShippingCountry([
                e.target.value,
                allShippingCountries[e.target.value],
              ])
            }
          >
            {Object.entries(allShippingCountries).map((o) => (
              <option key={o[0]} value={o[0]}>
                {o[1]}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button
          mt={4}
          width="full"
          bg={account?.branding?.secondary_color ?? "secondary"}
          onClick={handleCheckout}
          isDisabled={cartEmpty || loading || checkoutBlocked}
        >
          Checkout
        </Button>
        <Text mt={1} fontSize="xs" width="full" textAlign="center">
          Local taxes included (where applicable) Additional duties and taxes
          may apply.
        </Text>
        <Divider />
        <Text as="strong">{account.name}</Text>
        <Divider />
        {Object.entries(cartDetails).map((item) => (
          <Box key={item[0]}>
            <Flex mt={4} justify="space-between">
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
            {item[1].description &&
            !(
              item[1].description
                ?.replace(/\s/g, "")
                .split(",")[0]
                .toUpperCase() === "ALL"
            ) &&
            !item[1].description
              ?.replace(/\s/g, "")
              .split(",")
              .find(
                (c) => c.toUpperCase() === shippingCountry[0].toUpperCase()
              ) ? (
              <Text as="strong" mt={1} fontSize="xs" color="red.500">
                This item does not ship to {shippingCountry[1]}. Please remove
                it or change the shipping country.
              </Text>
            ) : (
              ""
            )}
            <Divider />
          </Box>
        ))}
      </DrawerBody>

      <DrawerFooter>
        <Box>
          <Flex align="center" justify="space-between">
            <Button
              width="50%"
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
              width="50%"
              bg={account?.branding?.secondary_color ?? "secondary"}
              onClick={handleCheckout}
              isDisabled={cartEmpty || loading || checkoutBlocked}
            >
              Checkout
            </Button>
          </Flex>
          <Image mt={4} width="100%" src="/pbs.svg" />
        </Box>
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
        scrollBehavior={"inside"}
        blockScrollOnMount={false}
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

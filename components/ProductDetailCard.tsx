import Stripe from "stripe";
import {
  Button,
  Box,
  Text,
  Image,
  Flex,
  Badge,
  useToast,
  Select,
  FormControl,
  FormLabel,
  Icon,
} from "@chakra-ui/core";
import { formatAmountForDisplay } from "../utils/helpers";
import { useShoppingCart } from "use-shopping-cart";
import { useManageCart } from "../utils/cart-manager";
import { useState, useEffect } from "react";
import getStripe from "../utils/get-stripejs";

interface Product extends Stripe.Product {
  prices?: Stripe.Price[];
}

export default function ProductDetailCard({
  product,
  account,
}: {
  product: Product;
  account: {
    id: string;
    name: string;
    details_submitted: boolean;
    default_currency: string;
    branding: Stripe.Account.Settings.Branding;
  };
}) {
  const toast = useToast();
  const { addItem, clearCart } = useShoppingCart();
  const { currentMerchant, setMerchant } = useManageCart();
  const [loading, setLoading] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const cartPrice = product.prices.find(
    (p) => p.currency === account.default_currency
  );
  useEffect(() => {
    setSelectedPrice(cartPrice);
  }, []);

  const addToCart = (event, price: Stripe.Price) => {
    console.log(currentMerchant);
    event.preventDefault();
    // Check if we already have an active Cart with a different merchant
    if (!currentMerchant) {
      setMerchant(account.id);
    } else if (account.id !== currentMerchant) {
      const confirmMessage =
        "You already have a cart session with a different merchant. Do you want to discard the old cart and start a new one?";
      if (window.confirm(confirmMessage)) {
        clearCart();
        setMerchant(account.id);
      } else {
        // abort
        return;
      }
    }
    addItem(
      {
        sku: price.id,
        price: price.unit_amount,
        name: product.name,
        currency: price.currency,
        image: product.images[0],
        // TODO figure out a better way to pass shipping countries.
        description: product.metadata.shippingCountries,
      },
      quantity
    );
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleCheckout = async () => {
    setLoading(true);
    const { error, session } = await fetch(
      `/api/products/${account.id}/${product.id}/checkout?price=${selectedPrice.id}&quantity=${quantity}`
    ).then((res) => res.json());
    if (error) {
      // TODO: show error message
      alert(error.message);
      setLoading(false);
    }
    const stripe = await getStripe(account.id);
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <Box p={4} border="1px" borderRadius="md" borderColor="gray.200">
      <Image
        width="100%"
        minWidth="250px"
        maxWidth="600px"
        rounded="md"
        src={product.images[0]}
        fallbackSrc="https://via.placeholder.com/300"
      />
      <Flex align="baseline" mt={2}>
        <Text
          mt={2}
          mr={2}
          fontSize="xl"
          fontWeight="semibold"
          lineHeight="short"
        >
          {product.name}
        </Text>
      </Flex>
      <Text mt={2}>{product.description}</Text>
      <Box mt={2} p={2} border="1px" borderRadius="md" borderColor="gray.200">
        <FormControl>
          <FormLabel htmlFor="price">Price</FormLabel>
          <Select
            id="price"
            mt={2}
            variant="unstyled"
            placeholder="Select price"
            defaultValue={cartPrice?.id}
            onChange={(e) => {
              const price = product.prices.find((p) => p.id === e.target.value);
              setSelectedPrice(price);
            }}
          >
            {product.prices.map((price) => (
              <option key={price.id} value={price.id}>
                {formatAmountForDisplay(price.unit_amount, price.currency)}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl mt={2}>
          <FormLabel htmlFor="quantity">Quantity</FormLabel>
          <Select
            id="quantity"
            mt={2}
            variant="unstyled"
            placeholder="Select quantity"
            defaultValue="1"
            onChange={(e) => {
              setQuantity(Number(e.target.value));
            }}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Select>
        </FormControl>
        <Text mt={1} fontSize="xs" width="full">
          Local taxes included (where applicable) Additional duties and taxes
          may apply.
        </Text>
      </Box>
      {product.metadata.shippingCountries ? (
        <Text mt={2} fontSize="xs">
          {`Shipping included to: ${
            product.metadata.shippingCountries.toUpperCase() === "ALL"
              ? "globally"
              : product.metadata.shippingCountries
          }`}
        </Text>
      ) : (
        ""
      )}
      <Flex mt={2}>
        <Button
          isDisabled={loading}
          onClick={handleCheckout}
          mr={4}
          bg={account?.branding?.secondary_color ?? "secondary"}
        >
          Buy now
        </Button>
        <Button
          isDisabled={selectedPrice?.currency !== account.default_currency}
          variant="outline"
          onClick={(e) => addToCart(e, cartPrice)}
        >
          Add to cart
        </Button>
      </Flex>
    </Box>
  );
}

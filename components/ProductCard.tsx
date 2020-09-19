import Stripe from "stripe";
import {
  Button,
  Box,
  Text,
  Image,
  Flex,
  Badge,
  useToast,
} from "@chakra-ui/core";
import { formatAmountForDisplay } from "../utils/helpers";
import { useShoppingCart } from "use-shopping-cart";
import { useManageCart } from "../utils/cart-manager";

interface Product extends Stripe.Product {
  prices?: Stripe.Price[];
}

export default function ProductCard({
  product,
  account,
  currency,
}: {
  product: Product;
  account: {
    id: string;
    name: string;
    details_submitted: boolean;
    default_currency: string;
    branding: Stripe.Account.Settings.Branding;
  };
  currency: string;
}) {
  const toast = useToast();
  const { addItem, clearCart } = useShoppingCart();
  const { currentMerchant, setMerchant } = useManageCart();

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
    addItem({
      sku: price.id,
      price: price.unit_amount,
      name: product.name,
      currency: price.currency,
      image: product.images[0],
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const price = product.prices.find((p) => p.currency === currency);
  return (
    <Box p={4} border="1px" borderRadius="md" borderColor="gray.200">
      <Image
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
        <Badge fontSize="1em">
          {formatAmountForDisplay(price.unit_amount, price.currency)}
        </Badge>
      </Flex>
      <Text mt={2}>{product.description}</Text>
      <Button
        mt={2}
        bg={account?.branding?.secondary_color ?? "secondary"}
        onClick={(e) => addToCart(e, price)}
      >
        Add to cart
      </Button>
    </Box>
  );
}

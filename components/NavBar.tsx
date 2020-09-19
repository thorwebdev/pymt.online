import Stripe from "stripe";
import { Box, Flex, Image, Heading } from "@chakra-ui/core";

import CartSummary from "./CartSummary";

export type Account = {
  id: string;
  name: string;
  details_submitted: boolean;
  default_currency: string;
  branding: Stripe.Account.Settings.Branding;
};

export default function NavBar({ account }: { account?: Account }) {
  return (
    <Flex
      bg={account?.branding?.primary_color ?? "primary"}
      w="fill"
      px={5}
      py={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Image src="/logo.svg" size={30} />
        <Heading
          fontSize="xl"
          pl={3}
          color={account?.branding?.secondary_color ?? "secondary"}
        >
          {account?.name ?? "pymt.online"}
        </Heading>
      </Flex>
      {account ? (
        <Box>
          <CartSummary account={account} />
        </Box>
      ) : (
        ""
      )}
    </Flex>
  );
}

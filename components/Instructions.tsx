import {
  Stack,
  Heading,
  Text,
  Image,
  Link as ChakraLink,
  Icon,
  Box,
  Code,
} from "@chakra-ui/core";

export default function Instructions({
  account,
}: {
  account?: { livemode: boolean };
}) {
  return (
    <Stack spacing={5}>
      <Heading as="h1" size="2xl">
        {account ? "Next steps:" : "How it works:"}
      </Heading>
      {account ? (
        ""
      ) : (
        <Stack spacing={5}>
          <Heading as="h2" size="xl">
            {`1. Create a Stripe Account`}
          </Heading>
          <Text>
            When you click the "Get started" button above you will be redirected
            to Stripe to create a new merchant account.
          </Text>
          <Box p={4} border="1px" borderRadius="md" borderColor="gray.200">
            <Image src="/steps/step-1.png" />
          </Box>
        </Stack>
      )}
      <Heading as="h2" size="xl">
        {`2. Create Products in Stripe`}
      </Heading>
      <Text>
        In your{" "}
        {account ? (
          <ChakraLink
            textDecor="underline"
            isExternal
            href={`https://dashboard.stripe.com/${
              account.livemode ? "" : "test/"
            }products`}
          >
            Stripe Dashboard <Icon name="external-link" mx="2px" />
          </ChakraLink>
        ) : (
          "Stripe Dashboard"
        )}
        , create your product listings. The pricing for your product must be
        one-time (recurring prices are not yet supported) and must include all
        taxes and shipping cost.
      </Text>
      <Text>
        You can enable shipping address collection by adding a comma separated
        list of countries to the product metadata using the{" "}
        <Code children="shippingCountries" /> key. If you ship globally you can
        simply set <Code children="all" /> as the value, which will enable
        shipping address collection for{" "}
        <ChakraLink
          textDecor="underline"
          isExternal
          href="https://stripe.com/docs/api/checkout/sessions/create#create_checkout_session-shipping_address_collection-allowed_countries"
        >
          all countries Stripe supports. <Icon name="external-link" mx="2px" />
        </ChakraLink>
      </Text>
      <Box p={4} border="1px" borderRadius="md" borderColor="gray.200">
        <Image src="/steps/step-2.gif" />
      </Box>
      <Heading as="h2" size="xl">
        {`3. Find your payment link`}
      </Heading>
      <Text>
        After you've created your product, pymt.online will automatically update
        your product metadata with your payment link. (Note: you might have to
        refresh the page.)
      </Text>
      <Box p={4} border="1px" borderRadius="md" borderColor="gray.200">
        <Image src="/steps/step-3.png" />
      </Box>
      <Heading as="h2" size="xl">
        {`4. Set your branding`}
      </Heading>
      <Text>
        You can customize your branding with your preferred colors and logo.
        Simply navigate to the{" "}
        <ChakraLink
          textDecor="underline"
          isExternal
          href="https://dashboard.stripe.com/settings/branding"
        >
          branding settings. <Icon name="external-link" mx="2px" />
        </ChakraLink>
      </Text>
      <Box p={4} border="1px" borderRadius="md" borderColor="gray.200">
        <Image src="/steps/step-4.gif" />
      </Box>
      <Heading as="h2" size="xl">
        {`5. Enable email notifications`}
      </Heading>
      <Text>
        Make sure to enable both{" "}
        <ChakraLink
          textDecor="underline"
          isExternal
          href="https://dashboard.stripe.com/settings/emails"
        >
          customer emails <Icon name="external-link" mx="2px" />
        </ChakraLink>{" "}
        and{" "}
        <ChakraLink
          textDecor="underline"
          isExternal
          href="https://dashboard.stripe.com/settings/user"
        >
          admin emails <Icon name="external-link" mx="2px" />
        </ChakraLink>{" "}
        so you never miss a purchase!
      </Text>
      <Box p={4} border="1px" borderRadius="md" borderColor="gray.200">
        <Image src="/steps/step-5.gif" />
      </Box>
      <Heading as="h2" size="xl">
        {`Done. Start selling 🥳`}
      </Heading>
      <Text>
        That's it. Send the payment link to your friends or add it to your
        Instagram bio and start selling.
      </Text>
    </Stack>
  );
}

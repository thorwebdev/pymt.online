import {
  Stack,
  Heading,
  Text,
  Image,
  Link as ChakraLink,
  Icon,
  Box,
} from "@chakra-ui/core";

export default function Instructions({ account }: { account?: object }) {
  return (
    <Stack spacing={3}>
      <Heading as="h1" size="2xl">
        {account ? "Next steps:" : "How it works:"}
      </Heading>
      {account ? (
        ""
      ) : (
        <>
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
        </>
      )}
      <Heading as="h2" size="xl">
        {`2. Create Products in Stripe`}
      </Heading>
      <Text>
        In your{" "}
        {account ? (
          <ChakraLink
            isExternal
            href={`https://dashboard.stripe.com/${
              account.livemode ? "" : "test/"
            }products`}
          >
            Stripe Dachboard <Icon name="external-link" mx="2px" />
          </ChakraLink>
        ) : (
          "Stripe Dashboard"
        )}
        , create your product listings.
      </Text>
      <Box p={4} border="1px" borderRadius="md" borderColor="gray.200">
        <Image src="/steps/step-2.png" />
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
        {`Done. Start selling 🥳`}
      </Heading>
      <Text>
        That's it. Send the payment link to your friends or add it to your
        Instagram bio and start selling.
      </Text>
    </Stack>
  );
}

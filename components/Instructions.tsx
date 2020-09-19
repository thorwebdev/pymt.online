import { Stack, Heading, Text } from "@chakra-ui/core";

export default function Instructions() {
  return (
    <Stack spacing={3}>
      <Heading as="h1" size="2xl">
        How it works:
      </Heading>
      <Heading as="h2" size="xl">
        {`1. Create a Stripe Account`}
      </Heading>
      <Text>
        When you click the "Get started" button above you will be redirected to
        Stripe to create a new merchant account.
      </Text>
      <Heading as="h2" size="xl">
        {`2. Create Products in Stripe`}
      </Heading>
      <Text>In your Stripe Dashboard, create your product listings.</Text>
      <Heading as="h2" size="xl">
        {`3. Find your payment link`}
      </Heading>
      <Text>
        After you've created your product, pymt.online will automatically update
        your product metadata with your payment link.
      </Text>
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

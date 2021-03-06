import Layout from "../components/Layout";
import Hero from "../components/Hero";
import {
  Flex,
  Box,
  Heading,
  Text,
  Stack,
  Link,
  Icon,
  List,
  ListItem,
} from "@chakra-ui/core";

export default function Terms() {
  return (
    <Layout>
      <Hero />
      <Flex p={5} align="center" justify="center">
        <Box maxWidth="1000px">
          <Stack spacing={5}>
            <Heading as="h1" size="xl">
              Simple & transparent pricing.
            </Heading>
            <Text>
              We charge a small comission fee for each successful sale you make
              so we can keep our servers running.
            </Text>
            <Heading as="h2" size="lg">
              <Link href="https://stripe.com/pricing" isExternal>
                Stripe fees <Icon name="external-link" mx="2px" />
              </Link>{" "}
              + 1% capped at US$0.50 per payment.
            </Heading>
            <Heading as="h3" size="md">
              Example pymt.online fee:
            </Heading>
            <List styleType="disc">
              <ListItem>US$05.00 payment: US$0.05 (1%)</ListItem>
              <ListItem>US$10.00 payment: US$0.10 (1%)</ListItem>
              <ListItem>
                US$50.00 payment: US$0.50 (1% max cap reached)
              </ListItem>
              <ListItem>US$100.00 payment: US$0.50 (0.5% due to cap)</ListItem>
              <ListItem>US$200.00 payment: US$0.50 (0.25% due to cap)</ListItem>
              <ListItem>US$500.00 payment: US$0.50 (0.1% due to cap)</ListItem>
            </List>
          </Stack>
        </Box>
      </Flex>
    </Layout>
  );
}

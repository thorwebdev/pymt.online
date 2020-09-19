import NextLink from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { isValidStripeId } from "../utils/helpers";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import {
  Box,
  Link as ChakraLink,
  Flex,
  Heading,
  List,
  ListItem,
  Icon,
  Skeleton,
} from "@chakra-ui/core";
import Instructions from "../components/Instructions";

export default function Connect() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(
    id && isValidStripeId("account", id as string)
      ? `/api/accounts/${id}`
      : null,
    async (url: string) => await fetch(url).then((res) => res.json())
  );

  if (
    !data?.account &&
    id &&
    isValidStripeId("account", id as string) &&
    !data?.error
  )
    return (
      <Layout>
        <Hero size="small" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
      </Layout>
    );
  if (data?.account?.details_submitted)
    return (
      <Layout>
        <Hero size="small" />
        <Flex p={5} align="center" justify="center">
          <Box maxWidth="1000px">
            <Heading as="h2" size="xl">
              {`You're successfully connected! 🥳`}
            </Heading>
            <List mt={4} mb={4} styleType="disc">
              <ListItem>
                <ChakraLink
                  isExternal
                  href={`https://dashboard.stripe.com/${
                    data?.account?.livemode ? "" : "test/"
                  }products`}
                >
                  Manage your products in Stripe.{" "}
                  <Icon name="external-link" mx="2px" />
                </ChakraLink>
              </ListItem>
              <ListItem>
                <NextLink href={`/${id}`} passHref>
                  <a>View your products.</a>
                </NextLink>
              </ListItem>
            </List>
            <Instructions account={data.account} />
          </Box>
        </Flex>
      </Layout>
    );
  if (data && typeof window === "object") window?.location?.replace("/");
  if (
    typeof window === "object" &&
    id &&
    !isValidStripeId("account", id as string)
  )
    window?.location?.replace("/");
  return (
    <Layout>
      <Hero />
      <Flex p={5} align="center" justify="center">
        <Box maxWidth="1000px">
          <Instructions />
        </Box>
      </Flex>
    </Layout>
  );
}

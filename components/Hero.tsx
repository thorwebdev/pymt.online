import NextLink from "next/link";
import { Flex, Box, Heading, Button, Image } from "@chakra-ui/core";

export default function Hero({ size }: { size?: string }) {
  return (
    <Box bg="primary">
      <Box bg="secondary" w="full" h="5px" />
      <Flex
        as="nav"
        wrap="wrap"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        maxWidth="800px"
        width="100%"
        p={8}
        mt={[0, 0, 8]}
        mb={[0, 0, 8]}
        mx="auto"
      >
        <NextLink href="/" passHref>
          <Box as="a">
            <Image size="100px" src="/logo.svg" alt="Logo image" />
          </Box>
        </NextLink>
        <Box maxW="32rem">
          <Heading as="h1" size="2xl" color="white">
            pymt.online
          </Heading>
          <Heading as="h2" size="lg" color="white" mt="24px">
            The fastest way to start selling online with Stripe.
          </Heading>
          <Flex align="center" wrap="wrap">
            {size !== "small" ? (
              <NextLink href="/api/accounts/link" passHref>
                <Button as="a" size="lg" bg="secondary" mt="24px" mr={4}>
                  Get started
                </Button>
              </NextLink>
            ) : (
              ""
            )}
            <Image maxHeight="48px" src="/pbsw.svg" mt="24px" />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

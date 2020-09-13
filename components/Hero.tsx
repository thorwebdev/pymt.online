import NextLink from "next/link";
import { Flex, Box, Heading, Button, Image } from "@chakra-ui/core";

export default function Hero({ size }: { size?: string }) {
  return (
    <Box bg="primary">
      <Box bg="secondary" w="full" h="5px" />
      <Flex
        as="nav"
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
          {size !== "small" ? (
            <>
              <Heading as="h2" size="lg" color="white">
                The fastest way to start selling online with Stripe.
              </Heading>
              <NextLink href="/account" passHref>
                <Button as="a" size="lg" bg="secondary" mt="24px">
                  Get started
                </Button>
              </NextLink>
            </>
          ) : (
            ""
          )}
        </Box>
      </Flex>
    </Box>
  );
}

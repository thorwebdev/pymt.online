import React, { ReactNode } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Flex, Box, Text, Link as ChakraLink } from "@chakra-ui/core";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "pymt.online" }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thorwebdev" />
      <meta name="twitter:title" content="TypeScript Next.js Stripe Example" />
      <meta
        name="twitter:description"
        content="Full-stack TypeScript example using Next.js, react-stripe-js, and stripe-node."
      />
      <meta name="twitter:image" content="/logo.svg" />
    </Head>
    {children}
    <footer>
      <Flex
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
        <Box>
          <Text
            as="span"
            color="grey.500"
          >{`Copyright © ${new Date().getFullYear()} `}</Text>
          <ChakraLink isExternal href="https://twitter.com/thorwebdev">
            {"@thorwebdev"}
          </ChakraLink>
        </Box>
        <NextLink href="/terms" passHref>
          <a>Terms · Privacy Policy · Refunds · About</a>
        </NextLink>
      </Flex>
    </footer>
  </>
);

export default Layout;

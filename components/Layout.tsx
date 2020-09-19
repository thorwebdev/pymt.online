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
      <Flex p={5} align="center" justify="center" flexWrap="wrap">
        <Box mr={2}>
          <Text
            as="span"
            color="grey.500"
          >{`Copyright © ${new Date().getFullYear()} `}</Text>
          <ChakraLink isExternal href="https://twitter.com/thorwebdev">
            {"@thorwebdev"}
          </ChakraLink>
        </Box>
        <Box>
          <NextLink href="/terms" passHref>
            <a>Terms · Privacy · Refunds</a>
          </NextLink>
        </Box>
      </Flex>
    </footer>
  </>
);

export default Layout;

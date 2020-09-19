import React, { ReactNode } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Flex, Box, Text, Link as ChakraLink } from "@chakra-ui/core";
import Stripe from "stripe";

type Props = {
  children: ReactNode;
  product?: Stripe.Product;
  account?: {
    id: string;
    name: string;
    details_submitted: boolean;
    default_currency: string;
    branding: Stripe.Account.Settings.Branding;
  };
};

const Layout = ({ children, account, product }: Props) => (
  <>
    <Head>
      <title>
        {product
          ? `${product.name} | pymt.online`
          : account
          ? `${account.name} | pymt.online`
          : "pymt.online"}
      </title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@thorwebdev" />
      <meta
        name="twitter:title"
        content={
          product
            ? `${product.name} | pymt.online`
            : account
            ? `${account.name} | pymt.online`
            : "pymt.online"
        }
      />
      <meta
        name="twitter:description"
        content={
          product
            ? `Buy ${product.name} on pymt.online`
            : account
            ? "Buy products online."
            : "The fastest way to start selling online."
        }
      />
      <meta
        name="twitter:image"
        content={
          product?.images[0] ??
          (account?.branding?.logo as string) ??
          (account?.branding?.icon as string) ??
          "https://pymt.online/logo.png"
        }
      />
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
            <a>Terms · Privacy · </a>
          </NextLink>
          <NextLink href="/pricing" passHref>
            <a>Pricing</a>
          </NextLink>
        </Box>
      </Flex>
    </footer>
  </>
);

export default Layout;

import React, { ReactNode } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Flex, Box, Text, Link as ChakraLink, Icon } from "@chakra-ui/core";
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
      <meta
        name="twitter:card"
        content={product || account ? "summary" : "summary_large_image"}
      />
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
            ? `Shop products by ${account.name}.`
            : "The fastest way to start selling online."
        }
      />
      <meta
        name="twitter:image"
        content={
          product || account
            ? product?.images[0] ??
              (account?.branding?.logo as string) ??
              (account?.branding?.icon as string) ??
              "https://pymt.online/logo.png"
            : "https://pymt.online/twitter_large.png"
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
        <Box mr={2}>
          <NextLink href="/terms" passHref>
            <a>Terms · Privacy · </a>
          </NextLink>
          <NextLink href="/pricing" passHref>
            <a>Pricing</a>
          </NextLink>
        </Box>
        <Box>
          <ChakraLink
            isExternal
            aria-label="GitHub"
            href="https://github.com/thorwebdev/pymt.online"
          >
            <Icon name="github" w="6" h="6" />
          </ChakraLink>
          <ChakraLink
            isExternal
            aria-label="Twitter"
            href="https://twitter.com/pymt_online"
          >
            <Icon name="twitter" w="5" h="5" />
          </ChakraLink>
        </Box>
      </Flex>
    </footer>
  </>
);

export default Layout;

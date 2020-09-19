import NextLink from "next/link";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";

import Stripe from "stripe";
import { getURL, isValidStripeId } from "../../../utils/helpers";
import Layout from "../../../components/Layout";
import NavBar from "../../../components/NavBar";
import {
  Skeleton,
  Flex,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
} from "@chakra-ui/core";
import Cart from "../../../components/Cart";
import SuccessModal from "../../../components/SuccessModal";
import ProductDetailCard from "../../../components/ProductDetailCard";
import { useManageCart } from "../../../utils/cart-manager";
import { useEffect } from "react";

export default function ProductPage({
  account,
  product,
}: {
  account: {
    id: string;
    name: string;
    details_submitted: boolean;
    default_currency: string;
    branding: Stripe.Account.Settings.Branding;
  };
  product: Stripe.Product;
}) {
  const { initMerchant } = useManageCart();
  useEffect(() => initMerchant(), []);
  const router = useRouter();
  const { success } = router.query;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback)
    return (
      <Layout>
        <NavBar />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
        <Skeleton height="20px" my="10px" />
      </Layout>
    );
  if (!product) return <DefaultErrorPage statusCode={404} />;
  return (
    <Layout>
      <Cart merchant={account.id} currency={account.default_currency}>
        <NavBar account={account} />
        <SuccessModal account={account} success={success} />
        <Flex p={4} align="center" justify="center">
          <Box>
            <Breadcrumb mb={4}>
              <BreadcrumbItem>
                <NextLink href={`/${account.id}`} passHref>
                  <BreadcrumbLink>All products</BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{product.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <ProductDetailCard product={product} account={account} />
          </Box>
        </Flex>
      </Cart>
    </Layout>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // We don't want to prebuilt the pages so we pass an empty array.
    paths: [],
    // We set fallback:true so the page will be built the first time it is visited.
    fallback: true,
  };
}

// This get's called the first time our page is visited as well as when the revalidate timer expires.
export async function getStaticProps({
  params,
}: {
  params: { merchant: string; product: string };
}) {
  const props: { account: object; product: object } = {
    account: null,
    product: null,
  };

  if (
    isValidStripeId("account", params.merchant) &&
    isValidStripeId("product", params.product)
  ) {
    const accountRes = await fetch(
      `${getURL()}/api/accounts/${params.merchant}`
    );
    const { account } = await accountRes.json();
    props.account = account;
    const res = await fetch(
      `${getURL()}/api/products/${params.merchant}/${params.product}`
    );
    const { product } = await res.json();
    props.product = product;
  }

  // Pass the product data to the page via props
  return {
    props,
    // Re-generate the product page at most once per minute
    // if a request comes in
    revalidate: 60, // in seconds
  };
}

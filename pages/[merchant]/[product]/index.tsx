import Link from "next/link";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";

import Stripe from "stripe";
import Product from "../../../components/Product";
import { getURL, isValidStripeId } from "../../../utils/helpers";

export default function ProductPage({ product }: { product: Stripe.Product }) {
  const router = useRouter();
  const { merchant, success } = router.query;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <div>Loading...</div>;
  if (!product) return <DefaultErrorPage statusCode={404} />;
  return (
    <>
      <Link href={`/${merchant}`}>
        <a>⬅️ See all products by this merchant.</a>
      </Link>
      {success !== undefined ? <h3>Thanks for your purchase!</h3> : ""}
      <Product product={product} merchant={merchant as string} />
      {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}
    </>
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
  const props: { product: object } = {
    product: null,
  };

  if (
    isValidStripeId("account", params.merchant) &&
    isValidStripeId("product", params.product)
  ) {
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

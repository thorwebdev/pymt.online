import Link from "next/link";
import { useRouter } from "next/router";
import Stripe from "stripe";

export default function ProductPage({ product }: { product: Stripe.Product }) {
  const router = useRouter();
  const { merchant } = router.query;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <div>Loading...</div>;
  if (!product) return <div>failed to load</div>;
  return (
    <>
      <Link href={`/${merchant}`}>
        <a>⬅️ See all products by this merchant.</a>
      </Link>
      <pre>{JSON.stringify(product, null, 2)}</pre>
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
  const res = await fetch(
    `${process.env.URL}/api/products/${params.merchant}/${params.product}`
  );
  const { product } = await res.json();

  // Pass the product data to the page via props
  return {
    props: { product },
    // Re-generate the product page at most once per minute
    // if a request comes in
    revalidate: 60, // in seconds
  };
}

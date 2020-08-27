import { useRouter } from "next/router";

export default function ProductPage({ product }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <div>Loading...</div>;
  if (!product || product.error) return <div>failed to load</div>;
  return <pre>{JSON.stringify(product, null, 2)}</pre>;
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  };
}

// This also gets called at build time
export async function getStaticProps({
  params,
}: {
  params: { merchant: string; product: string };
}) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `${process.env.URL}/api/products/${params.merchant}/${params.product}`
  );
  const product = await res.json();

  // Pass post data to the page via props
  return {
    props: { product },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 60,
  };
}

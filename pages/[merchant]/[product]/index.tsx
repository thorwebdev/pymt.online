import { useRouter } from "next/router";
import useSWR from "swr";

export default function ProductPage({ product }) {
  const router = useRouter();
  const { merchant, product: productId } = router.query;
  const { data, error } = useSWR(
    productId ? `/api/products/${merchant}/${productId}` : null,
    async (url) => await fetch(url).then((res) => res.json())
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log({ data });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
// export async function getServerSideProps() {
//   const router = useRouter();
//   const { merchant, product: productId } = router.query;
//   const res = await fetch(`/api/products/${merchant}/${productId}`);
//   const product = await res.json();

//   return {
//     props: {
//       product,
//     },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every second
//     // revalidate: 1, // In seconds
//   };
// }

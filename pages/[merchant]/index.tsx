import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import Stripe from "stripe";

export default function MerchantLandingPage() {
  const router = useRouter();
  const { merchant } = router.query;
  const { data, error } = useSWR(
    merchant ? `/api/products/${merchant}` : null,
    async (url: string) => await fetch(url).then((res) => res.json())
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <ul>
      {data.map((product: Stripe.Product) => (
        <li>
          <Link href={`/${merchant}/${product.id}`}>
            <a>{product.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

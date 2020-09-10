import { useRouter } from "next/router";
import Link from "next/link";

import Stripe from "stripe";
import Cart from "../../components/Cart";
import CartSummary from "../../components/CartSummary";
import Product from "../../components/Product";

export default function MerchantLandingPage({
  account,
  products,
}: {
  account: {
    id: string;
    name: string;
    details_submitted: boolean;
    default_currency: string;
    branding: Stripe.Account.Settings.Branding;
  };
  products: Stripe.Product[];
}) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <div>Loading...</div>;
  if (!products) return <div>failed to load</div>;
  return (
    // TODO: currency selector
    <Cart merchant={account.id} currency={account.default_currency}>
      <pre>{JSON.stringify(account, null, 2)}</pre>
      <CartSummary merchant={account.id} />
      <hr />
      <div>
        {products.map((product: Stripe.Product) => (
          <div key={product.id}>
            <Link href={`/${account.id}/${product.id}`}>
              <a>
                {
                  <Product
                    page="merchant"
                    product={product}
                    merchant={account.id}
                    currency={account.default_currency}
                  />
                }
              </a>
            </Link>
          </div>
        ))}
      </div>
    </Cart>
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
  params: { merchant: string };
}) {
  const accountRes = await fetch(
    `${process.env.VERCEL_URL}/api/accounts/${params.merchant}`
  );
  const { account } = await accountRes.json();
  const productRes = await fetch(
    `${process.env.VERCEL_URL}/api/products/${params.merchant}`
  );
  const { products } = await productRes.json();

  // Pass the product data to the page via props
  return {
    props: { account, products },
    // Re-generate the product page at most once per minute
    // if a request comes in
    revalidate: 60, // in seconds
  };
}

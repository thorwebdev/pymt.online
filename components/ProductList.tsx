import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";

import Stripe from "stripe";

export default function ProductList({ account, products }) {
  const { addItem } = useShoppingCart();
  return (
    <div>
      {products.map((product: Stripe.Product) => (
        <div key={product.id}>
          <Link href={`/${account.id}/${product.id}`}>
            <a>{product.name}</a>
          </Link>
          <button
            onClick={() =>
              addItem({
                currency: "USD",
                name: product.name,
                price: 400,
                sku: "price_1HJWj6KlJi2q90cwg6bFDEfe",
              })
            }
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

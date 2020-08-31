import Stripe from "stripe";
import { formatAmountForDisplay } from "../utils/stripe-helpers";
import { useState } from "react";
import getStripe from "../utils/get-stripejs";

interface Product extends Stripe.Product {
  prices?: Stripe.Price[];
}

export default function Product({
  product,
  merchant,
}: {
  product: Product;
  merchant: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const price = formData.get("price");
    const { error, session } = await fetch(
      `/api/products/${merchant}/${product.id}/checkout?price=${price}&quantity=1`
    ).then((res) => res.json());
    if (error) {
      // TODO: show error message
      alert(error.message);
      setLoading(false);
    }
    const stripe = await getStripe(merchant);
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <img src={product.images[0]} alt={`Product image of ${product.name}`} />
      <select name="price">
        {product.prices.map((price) => (
          <option key={price.id} value={price.id}>
            {formatAmountForDisplay(price.unit_amount, price.currency)}
          </option>
        ))}
      </select>
      <button disabled={loading} role="link">
        Buy
      </button>
    </form>
  );
}

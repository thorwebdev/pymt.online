import Stripe from "stripe";
import { formatAmountForDisplay } from "../utils/stripe-helpers";
import { useState } from "react";
import getStripe from "../utils/get-stripejs";
import { useShoppingCart } from "use-shopping-cart";
import { useManageCart } from "../utils/cart-manager";

interface Product extends Stripe.Product {
  prices?: Stripe.Price[];
}

export default function Product({
  product,
  merchant,
  page = "product",
  currency,
}: {
  product: Product;
  merchant: string;
  page?: string;
  currency?: string;
}) {
  const [loading, setLoading] = useState(false);
  const { addItem, clearCart } = useShoppingCart();
  const { currentMerchant, setMerchant } = useManageCart();

  const addToCart = (event) => {
    event.preventDefault();
    // Check if we already have an active Cart with a different merchant
    if (!currentMerchant) {
      setMerchant(merchant);
    } else if (merchant !== currentMerchant) {
      const confirmMessage =
        "You already have a cart session with a different merchant. Do you want to discard the old cart and start a new one?";
      if (window.confirm(confirmMessage)) {
        clearCart();
        setMerchant(merchant);
      } else {
        // abort
        return;
      }
    }
    const formData = new FormData(event.target.parentElement);
    const priceId = formData.get("price");
    const price = product.prices.find((p) => p.id === priceId);
    if (!price) throw new Error("Can't find price object");
    addItem({
      sku: price.id,
      price: price.unit_amount,
      name: product.name,
      currency: price.currency,
    });
  };

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

  if (
    page === "merchant" &&
    currency &&
    !product.prices.find((p) => p.currency === currency)
  ) {
    return (
      <div>
        <span>{`Product "${product.name}" has no price for currency "${currency}"!`}</span>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <img
        width="200"
        src={product.images[0]}
        alt={`Product image of ${product.name}`}
      />
      <select name="price" onClick={(e) => e.preventDefault()}>
        {product.prices
          .filter((p) => !currency || p.currency === currency)
          .map((price) => (
            <option key={price.id} value={price.id}>
              {formatAmountForDisplay(price.unit_amount, price.currency)}
            </option>
          ))}
      </select>
      {page === "merchant" ? (
        <button onClick={addToCart} disabled={loading} type="button">
          Add to cart
        </button>
      ) : (
        <button disabled={loading} role="link">
          Buy now
        </button>
      )}
    </form>
  );
}

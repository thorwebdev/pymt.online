import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useShoppingCart } from "use-shopping-cart";
import { useManageCart } from "../utils/cart-manager";
import { fetchPostJSON } from "../utils/stripe-helpers";

const CartSummary = ({ merchant }) => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();
  const { initMerchant, currentMerchant, clearMerchant } = useManageCart();

  useEffect(() => initMerchant(), []);
  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);

    // TODO create our checkout session
    const response = await fetchPostJSON("api/checkout", {
      cartItems: cartDetails,
      merchant,
    });

    redirectToCheckout({ sessionId: response.id });
  };

  if (currentMerchant && merchant !== currentMerchant)
    return (
      <div>
        <h2>Cart summary</h2>
        <Link href={`/${currentMerchant}`}>
          <a>Go to merchant page</a>
        </Link>
        <button
          type="button"
          onClick={(_) => {
            clearCart();
            clearMerchant();
          }}
        >
          Clear Cart
        </button>
      </div>
    );
  return (
    <form onSubmit={handleCheckout}>
      <h2>Cart summary</h2>
      {/* This is where we'll render our cart */}
      <p suppressHydrationWarning>
        <strong>Number of Items:</strong> {cartCount}
      </p>
      <p suppressHydrationWarning>
        <strong>Total:</strong> {formattedTotalPrice}
      </p>

      {/* Redirects the user to Stripe */}
      <button
        className="cart-style-background"
        type="submit"
        disabled={cartEmpty || loading}
      >
        Checkout
      </button>
      <button
        type="button"
        onClick={(_) => {
          clearCart();
          clearMerchant();
        }}
      >
        Clear Cart
      </button>
    </form>
  );
};

export default CartSummary;

import React, { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";
import getStripe from "../utils/get-stripejs";

export default function Cart({
  children,
  merchant,
  currency,
}: {
  children: ReactNode;
  merchant: string;
  currency: string;
}) {
  return (
    <CartProvider
      mode="checkout-session"
      stripe={getStripe(merchant)}
      currency={currency}
    >
      <>{children}</>
    </CartProvider>
  );
}

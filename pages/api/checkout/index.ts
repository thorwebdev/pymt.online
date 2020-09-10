import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});

type CartItem = {
  currency: string;
  name: string;
  price: number;
  sku: string;
  quantity: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        cartItems,
        merchant,
      }: { cartItems: Array<CartItem>; merchant: string } = req.body;

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = Object.keys(
        cartItems
      ).map((key) => ({
        price: cartItems[key].sku,
        quantity: cartItems[key].quantity,
      }));
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        line_items,
        success_url: `${process.env.VERCEL_URL}/${merchant}?success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.VERCEL_URL}/${merchant}`,
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params,
        { stripeAccount: merchant }
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

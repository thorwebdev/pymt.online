import { NextApiRequest, NextApiResponse } from "next";
import { getURL, isValidStripeId } from "../../../utils/helpers";

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
        shippingCountries,
      }: {
        cartItems: Array<CartItem>;
        merchant: string;
        shippingCountries: string[];
      } = req.body;
      if (!isValidStripeId("account", merchant))
        throw { message: "Invalid Stripe ID." };
      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = Object.keys(
        cartItems
      ).map((key) => ({
        price: cartItems[key].sku,
        quantity: cartItems[key].quantity,
      }));
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        mode: "payment",
        // TODO: figure out our pricing
        // payment_intent_data: {
        //   application_fee_amount: 123,
        // },
        submit_type: "pay",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_address_collection: {
          allowed_countries: shippingCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
        },
        line_items,
        success_url: `${getURL()}/${merchant}?success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${getURL()}/${merchant}`,
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

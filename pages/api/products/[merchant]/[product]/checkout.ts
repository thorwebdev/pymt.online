import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

import allShippingCountries from "../../../../../utils/shippingCountries.json";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { merchant, product, price, quantity },
  } = req;

  try {
    const checkoutSessionCreateParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      line_items: [
        {
          price: price as string,
          quantity: quantity ? Number(quantity) : 1,
        },
      ],
      mode: "payment",
      // TODO: figure out our pricing
      // payment_intent_data: {
      //   application_fee_amount: 123,
      // },
      success_url: `https://${process.env.VERCEL_URL}/${merchant}/${product}?success`,
      cancel_url: `https://${process.env.VERCEL_URL}/${merchant}/${product}`,
    };
    // Retrieve product object to check metadata for shipping locations.
    const stripeProduct = await stripe.products.retrieve(
      product as string,
      null,
      { stripeAccount: merchant as string }
    );
    const shippingMetadata = stripeProduct.metadata.shippingCountries;
    if (shippingMetadata) {
      const shippingCountries = shippingMetadata.replace(/\s/g, "").split(",");
      if (shippingCountries[0].toUpperCase() === "ALL") {
        checkoutSessionCreateParams.shipping_address_collection = {
          allowed_countries: allShippingCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
        };
      } else {
        checkoutSessionCreateParams.shipping_address_collection = {
          allowed_countries: shippingCountries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
        };
      }
    }
    const { id } = await stripe.checkout.sessions.create(
      checkoutSessionCreateParams,
      {
        stripeAccount: merchant as string,
      }
    );
    res.status(200).json({ session: { id } });
  } catch (error) {
    res.status(400).json({ error, session: null });
  }
};

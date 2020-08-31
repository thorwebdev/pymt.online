import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { merchant, product, price, quantity },
  } = req;

  try {
    const { id } = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
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
        success_url: `${process.env.URL}/${merchant}/${product}?success`,
        cancel_url: `${process.env.URL}/${merchant}/${product}`,
      },
      { stripeAccount: merchant as string }
    );
    res.status(200).json({ session: { id } });
  } catch (error) {
    res.status(400).json({ error, session: null });
  }
};

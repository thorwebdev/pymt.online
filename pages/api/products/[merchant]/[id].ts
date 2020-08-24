import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { merchant, id },
  } = req;

  try {
    console.log({ merchant, id });
    const product = await stripe.products.retrieve(id as string, {
      stripeAccount: merchant as string,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error });
  }
};

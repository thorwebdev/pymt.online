import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Stripe.Product[] | any>
) => {
  const {
    query: { merchant, id },
  } = req;

  try {
    const products = await stripe.products.list(
      { active: true, limit: 10 },
      {
        stripeAccount: merchant as string,
      }
    );
    res.status(200).json({ products: products.data });
  } catch (error) {
    res.status(400).json({ error, products: null });
  }
};

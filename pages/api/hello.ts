import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Stripe.Charge>
) => {
  const payments = await stripe.charges.list({ limit: 1 });
  const payment = payments.data[0];
  res.status(200).json(payment);
};

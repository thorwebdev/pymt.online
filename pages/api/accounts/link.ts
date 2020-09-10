import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const account = await stripe.accounts.create({
      type: "standard",
    });
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.VERCEL_URL}/account?id=${account.id}`,
      return_url: `${process.env.VERCEL_URL}/account?id=${account.id}`,
      type: "account_onboarding",
    });

    res.status(302).redirect(accountLink.url);
  } catch (error) {
    // TODO: Ping our log system with error
    res.status(400).json({ error: "Something went wrong. Check logs." });
  }
};

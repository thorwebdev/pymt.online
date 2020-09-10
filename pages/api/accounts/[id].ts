import { NextApiRequest, NextApiResponse } from "next";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;
  try {
    const accountObject = await stripe.accounts.retrieve(id as string);
    const {
      details_submitted,
      default_currency,
      settings: {
        branding,
        dashboard: { display_name },
      },
    } = accountObject;
    // branding.icon = branding.icon
    //   ? (
    //       await stripe.fileLinks.create(
    //         {
    //           file: branding.icon as string,
    //         },
    //         { stripeAccount: id as string }
    //       )
    //     ).url
    //   : null;
    // branding.logo = branding.logo
    //   ? (
    //       await stripe.fileLinks.create(
    //         {
    //           file: branding.logo as string,
    //         },
    //         { stripeAccount: id as string }
    //       )
    //     ).url
    //   : null;

    if (!details_submitted) {
      // Disconnect unclaimed account
      await stripe.oauth.deauthorize({
        client_id: process.env.STRIPE_CONNECT_CLIENT_ID,
        stripe_user_id: id as string,
      });
    }

    res.status(200).json({
      account: {
        id,
        details_submitted,
        name: display_name,
        branding,
        default_currency,
      },
    });
  } catch (error) {
    res.status(400).json({ error, account: null });
  }
};

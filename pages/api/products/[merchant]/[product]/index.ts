import { NextApiRequest, NextApiResponse } from "next";
import { isValidStripeId } from "../../../../../utils/helpers";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

interface Product extends Stripe.Product {
  prices?: Stripe.Price[];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Product | any>
) => {
  const {
    query: { merchant, product: productID },
  } = req;

  try {
    if (
      !isValidStripeId("account", merchant as string) ||
      !isValidStripeId("product", productID as string)
    )
      throw { message: "Invalid Stripe ID." };
    const product: Product = await stripe.products.retrieve(
      productID as string,
      {
        stripeAccount: merchant as string,
      }
    );
    const prices = await stripe.prices.list(
      { product: product.id },
      { stripeAccount: merchant as string }
    );
    product.prices = prices.data;
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error, product: null });
  }
};

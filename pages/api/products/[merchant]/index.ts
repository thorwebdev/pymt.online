import { NextApiRequest, NextApiResponse } from "next";
import { isValidStripeId } from "../../../../utils/helpers";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-03-02",
});

interface Product extends Stripe.Product {
  prices?: Stripe.Price[];
}
type Products = { [key: string]: Product };

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{ error?: object; products: Product[] }>
) => {
  const {
    query: { merchant },
  } = req;

  try {
    if (!isValidStripeId("account", merchant as string))
      throw { message: "Invalid Stripe ID." };
    const prices = await stripe.prices.list(
      { active: true, limit: 100, expand: ["data.product"] },
      {
        stripeAccount: merchant as string,
      }
    );

    // Group all prices by their products and currencies;
    const products: Products = {};
    for (const price of prices.data) {
      // Currently only non-recurring prices are supported.
      if (!price.recurring && (price.product as Stripe.Product).active) {
        const product = price.product as Stripe.Product;
        if (!products[product.id]) {
          products[product.id] = product;
          products[product.id]["prices"] = [];
        }
        price.product = product.id;
        products[product.id]["prices"].push(price);
      }
    }

    res.status(200).json({ products: Object.values(products) });
  } catch (error) {
    res.status(400).json({ error, products: null });
  }
};

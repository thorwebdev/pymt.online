/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
let currentMerchant: string;
const getStripe = (merchant?: string) => {
  if (!stripePromise || merchant !== currentMerchant) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
      { stripeAccount: merchant }
    );
  }
  return stripePromise;
};

export default getStripe;

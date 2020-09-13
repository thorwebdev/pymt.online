import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { isValidStripeId } from "../utils/helpers";

export default function Connect() {
  const redirectToStripe = () => window.location.assign("/api/accounts/link");

  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(
    id && isValidStripeId("account", id as string)
      ? `/api/accounts/${id}`
      : null,
    async (url: string) => await fetch(url).then((res) => res.json())
  );

  if (
    !data?.account &&
    id &&
    isValidStripeId("account", id as string) &&
    !data?.error
  )
    return <div>loading...</div>;
  if (data?.account?.details_submitted)
    return (
      <>
        <h3>You're successfully connected!</h3>
        <ul>
          <li>
            <Link href={`/${id}`}>
              <a>View your products</a>
            </Link>
          </li>
          <li>
            <a
              href={`https://dashboard.stripe.com/${
                data?.account?.livemode ? "" : "test/"
              }products`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Manage your products in Stripe.
            </a>
          </li>
        </ul>
      </>
    );
  return <button onClick={redirectToStripe}>Connect with Stripe</button>;
}

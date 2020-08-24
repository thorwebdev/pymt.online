import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Connect() {
  const redirectToStripe = () => window.location.assign("/api/accounts/link");

  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(
    id ? `/api/accounts/${id}` : null,
    async (url: string) => await fetch(url).then((res) => res.json())
  );

  if (!data && id) return <div>loading...</div>;
  if (data?.details_submitted)
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
            <a href="https://dashboard.stripe.com/">Go to Stripe Dashboard</a>
          </li>
        </ul>
      </>
    );
  return <button onClick={redirectToStripe}>Connect with Stripe</button>;
}

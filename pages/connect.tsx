export default function Connect() {
  const redirectToStripe = () => window.location.assign("/api/connect/link");
  return <button onClick={redirectToStripe}>Connect with Stripe</button>;
}

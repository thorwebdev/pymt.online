const isClient = typeof window === "object";

export function formatAmountForDisplay(
  amount: number,
  currency: string
): string {
  let numberFormat = new Intl.NumberFormat(
    isClient ? navigator.language : "en-US",
    {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol",
    }
  );
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  const amountToFormat = zeroDecimalCurrency ? amount : amount / 100;
  return numberFormat.format(amountToFormat);
}

export async function fetchPostJSON(url: string, data?: {}) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  } catch (err) {
    throw new Error(err.message);
  }
}

export function getURL() {
  const url =
    process?.env?.URL ?? process?.env?.VERCEL_URL ?? "http://localhost:3000";
  return url.includes("http") ? url : `https://${url}`;
}

type StripeIdPrefix = {
  account?: { prefix: "acct_"; minLength: number };
  product?: { prefix: "prod_"; minLength: number };
  payment?: { prefix: "py_"; minLength: number };
};

export function isValidStripeId(type: keyof StripeIdPrefix, id: string) {
  const prefixMap: StripeIdPrefix = {
    account: { prefix: "acct_", minLength: 21 },
    product: { prefix: "prod_", minLength: 19 },
  };

  return (
    id.startsWith(prefixMap[type].prefix) &&
    id.length >= prefixMap[type].minLength
  );
}

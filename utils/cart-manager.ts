const isClient = typeof window === "object";

let currentMerchant: string = null;

export function useManageCart() {
  return {
    currentMerchant,
    initMerchant: (): void => {
      currentMerchant = isClient
        ? window.localStorage.getItem("cart-merchant")
        : null;
    },
    setMerchant: (merchant: string): void => {
      currentMerchant = merchant;
      if (isClient) window.localStorage.setItem("cart-merchant", merchant);
    },
    clearMerchant: (): void => {
      currentMerchant = null;
      if (isClient) window.localStorage.removeItem("cart-merchant");
    },
  };
}

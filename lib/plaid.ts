import { usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";

export const plaidUrl =
  process.env.NODE_ENV === "development"
    ? "https://sandbox.plaid.com"
    : "https://production.plaid.com";

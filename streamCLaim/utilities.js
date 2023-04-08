import { useEffect, useState } from "react";

export const SuperToken = {
  fDAIx: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f",
  fUSDCx: "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7",
  fTUSDx: "0x918E0d5C96cAC79674E2D38066651212be3C9C48",
};
export function getTokenName(value) {
  for (let key in SuperToken) {
    if (SuperToken[key] === value) {
      return key;
    }
  }
  return null; // return null if value is not found
}
export function shortenAddress(address) {
  if (typeof address !== "string" || address.length !== 42) {
    address = "0x0000000000000000000000000000000000000000";
  }

  const start = address.slice(0, 6);
  const end = address.slice(-6);
  return `${start}......${end}`;
}

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export function calculateAmountFromFlowRate(flowRate) {
  const monthlyAmount = flowRate * 2628000;
  const amountInEther = monthlyAmount / 10 ** 18;
  return Math.round(amountInEther);
}

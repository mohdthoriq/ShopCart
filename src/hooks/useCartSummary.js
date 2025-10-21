import { useMemo } from "react";
import useCart from "./useCart";

export const useCartSummary = () => {
  const { cart } = useCart();
  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  return { totalItems, totalPrice };
};


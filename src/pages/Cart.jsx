import { Link, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useCartSummary } from "../hooks/useCartSummary";
import { useTheme } from "../context/ThemeProvider";
import { ShoppingCart } from "lucide-react";
import { useLoading } from "../context/LoadingContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { totalPrice, totalItems } = useCartSummary();
  const { colors, theme } = useTheme();
  const navigate = useNavigate();
  const { withLoading } = useLoading();

  const handleProceedToCheckout = () => {
    withLoading(() => navigate('/checkout'));
  };

  if (cart.length === 0) {
    return (
      <div
        className="container mx-auto px-4 py-16 text-center"
        style={{ color: "var(--color-text)" }}
      >
        <ShoppingCart
          size={64}
          className="mx-auto mb-4"
          style={{ color: colors.muted }}
        />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="mb-6 opacity-80">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link 
          to="/products"
          style={{ color: colors.primary }}
          className="hover:underline"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-4 py-8 transition-colors duration-300"
      style={{ color: "var(--color-text)" }}
    >
      <h1
        className="text-3xl font-bold mb-8"
        style={{ color: "var(--color-primary)" }}
      >
        Your Cart
      </h1>
      <div className="flex flex-col gap-8">
        {/* 🧺 Cart Items */}
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 rounded-xl shadow-lg transition-shadow duration-300"
              style={{
                backgroundColor: "var(--color-surface)",
                boxShadow:
                  theme === "light"
                    ? "0 4px 20px rgba(0,0,0,0.08)"
                    : "0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-contain rounded-lg bg-white p-2"
              />
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p style={{ color: colors.primary }} className="font-bold">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-300 dark:hover:bg-gray-700"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-300 dark:hover:bg-gray-700"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 font-medium hover:underline"
                    style={{ color: colors.danger }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 💰 Order Summary */}
        <div className="flex justify-end pt-4">
          <div
            className="p-6 rounded-xl shadow-lg transition-shadow duration-300 flex flex-col w-full sm:w-1/2 lg:w-2/5"
            style={{
              backgroundColor: "var(--color-surface)",
              boxShadow:
                theme === "light"
                  ? "0 4px 20px rgba(0,0,0,0.08)"
                  : "0 4px 20px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex-grow">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span className="font-medium">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Price</span>
                  <span
                    className="font-bold"
                    style={{ color: colors.primary }}
                  >
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="mt-6 w-full block py-3 px-6 text-center rounded-lg font-semibold transition hover:opacity-90 self-end"
              style={{
                backgroundColor: colors.primary,
                color: "var(--color-on-primary)",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

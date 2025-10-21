import { Navigate, useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useAuth } from "../context/AuthContext";
import useNotification from "../hooks/useNotification";
import { useTheme } from "../context/ThemeProvider";

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { colors, theme } = useTheme();
  const { showNotification } = useNotification();

  if (!user) return <Navigate to="/login" />;
  if (cart.length === 0) return <Navigate to="/cart" />;

  const handleCheckout = () => {
    showNotification("Checkout successful! Thank you for your purchase.", "success");
    clearCart();
    navigate("/products");
  };

  return (
    <div
      className="container mx-auto px-4 py-16 max-w-2xl transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-bg)",
        minHeight: "100vh",
      }}
    >
      <div
        className="rounded-xl shadow-lg p-8 transition-all duration-300"
        style={{
          backgroundColor: "var(--color-surface)",
          color: colors.text,
          boxShadow:
            theme === "light"
              ? "0 4px 20px rgba(0,0,0,0.1)"
              : "0 4px 20px rgba(0,0,0,0.6)",
        }}
      >
        <h1
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: colors.primary }}
        >
          Checkout
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-2"
                style={{ borderColor: colors.accent }}
              >
                <span>{item.title} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div
            className="border-t pt-3 mt-3 flex justify-between font-bold text-lg"
            style={{ borderColor: colors.accent }}
          >
            <span>Total</span>
            <span style={{ color: colors.primary }}>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full py-3 text-[var(--color-on-primary)] rounded-lg transition font-semibold hover:opacity-90"
          style={{ backgroundColor: colors.primary }}
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

const NotFoundPage = () => {
  const { colors, theme } = useTheme();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-bg)",
        color: colors.text,
      }}
    >
      <div
        className="rounded-2xl shadow-lg p-10 w-full max-w-md text-center transition-all duration-300"
        style={{
          backgroundColor: "var(--color-surface)",
          boxShadow:
            theme === "light"
              ? "0 6px 20px rgba(0,0,0,0.1)"
              : "0 6px 20px rgba(0,0,0,0.6)",
        }}
      >
        <AlertTriangle
          size={72}
          className="mx-auto mb-5"
          style={{ color: colors.primary }}
        />
        <h1
          className="text-5xl font-extrabold mb-2 tracking-wide"
          style={{ color: colors.primary }}
        >
          404
        </h1>
        <h2 className="text-2xl font-semibold mb-3">Page Not Found</h2>
        <p className="mb-8 opacity-80">
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/products"
          className="px-5 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
          style={{
            backgroundColor: colors.primary,
            color: "var(--color-on-primary)",
          }}
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

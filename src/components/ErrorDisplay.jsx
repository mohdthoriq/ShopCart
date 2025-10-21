import { AlertTriangle } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

const ErrorDisplay = ({ message, onRetry }) => {
  const { colors, theme } = useTheme();

  return (
    <div
      className="rounded-2xl shadow-lg p-10 w-full max-w-md text-center transition-all duration-300 mx-auto my-10"
      style={{
        backgroundColor: "var(--color-surface)",
        color: colors.text,
        boxShadow:
          theme === "light"
            ? "0 6px 20px rgba(0,0,0,0.1)"
            : "0 6px 20px rgba(0,0,0,0.6)",
      }}
    >
      <AlertTriangle
        size={60}
        className="mx-auto mb-5"
        style={{ color: colors.danger }}
      />
      <h2 className="text-2xl font-semibold mb-3">Oops! Something went wrong.</h2>
      <p className="mb-6 opacity-80" style={{ color: colors.danger }}>
        {message || "An unexpected error occurred."}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="px-5 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300" style={{ backgroundColor: colors.primary, color: "var(--color-on-primary)" }}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
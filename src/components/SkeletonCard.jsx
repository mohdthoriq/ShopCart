import { useTheme } from "../context/ThemeProvider";

const SkeletonCard = () => {
  const { colors, theme } = useTheme();

  const baseColor = theme === "light" ? "#E2E8F0" : "#374151"; // abu2 sesuai mode
  const highlightColor = theme === "light" ? "#F8FAFC" : "#4B5563"; // sedikit lebih terang

  return (
    <div
      className="rounded-xl shadow-md overflow-hidden animate-pulse"
      style={{
        backgroundColor: theme === "light" ? colors.surface : colors.background,
      }}
    >
      <div
        className="w-full h-48 rounded-t-xl"
        style={{ backgroundColor: baseColor }}
      />
      <div className="p-4 space-y-3">
        <div
          className="h-4 rounded w-3/4"
          style={{ backgroundColor: highlightColor }}
        />
        <div
          className="h-4 rounded w-1/2"
          style={{ backgroundColor: highlightColor }}
        />
        <div
          className="h-10 rounded"
          style={{ backgroundColor: baseColor }}
        />
      </div>
    </div>
  );
};

export default SkeletonCard;

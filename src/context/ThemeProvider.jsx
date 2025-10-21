import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const lightColors = {
    "--color-primary": "#5db87cff", // Sedikit lebih lembut
    "--color-secondary": "#CFFDE1", // Lebih soft untuk background sekunder
    "--color-accent": "#E9B824", // Aksen yang lebih hangat
    "--color-danger": "#E96479", // Merah yang tidak terlalu mencolok
    "--color-bg": "#9fec9fff",
    "--color-text": "#212529",
    "--color-surface": "#FFFFFF",
    "--color-muted": "#6c757d",
    "--color-on-primary": "#FFFFFF", // Teks putih di atas warna primer
  };

  const darkColors = {
    "--color-primary": "#40A2E3", // Biru yang lebih cerah untuk kontras
    "--color-secondary": "#272829", // Background sekunder yang lebih netral
    "--color-accent": "#61677A", // Aksen abu-abu kebiruan
    "--color-danger": "#E96479", // Merah yang konsisten
    "--color-bg": "#121212", // Hitam yang lebih soft
    "--color-text": "#f8f9fa",
    "--color-surface": "#1e1e1e", // Permukaan yang sedikit lebih terang dari bg
    "--color-muted": "#6c757d",
    "--color-on-primary": "#FFFFFF", // Teks putih di atas warna primer
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    const themeColors = theme === "light" ? lightColors : darkColors;
    Object.entries(themeColors).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  
  // Hapus '--color-' dari key untuk membuat objek colors yang lebih bersih
  const cleanColors = Object.fromEntries(
    Object.entries(theme === "light" ? lightColors : darkColors).map(([key, value]) => [
      key.replace("--color-", ""),
      value,
    ])
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: cleanColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

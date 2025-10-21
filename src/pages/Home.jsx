import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const HomePage = () => {
  const { colors, theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=4');
        if (!response.ok) {
          throw new Error('Failed to fetch featured products');
        }
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleExploreClick = () => {
    if (!user) {
      showNotification("Silakan login terlebih dahulu untuk melihat produk", "error");
      navigate('/login');
    } else {
      navigate('/products');
    }
  };

  return (
    <div
      className="min-h-screen w-full transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-bg)",
        color: colors.text,
      }}
    >
      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center text-center py-24 px-6"
        style={{
          background: `radial-gradient(circle, var(--color-secondary) 0%, var(--color-bg) 70%)`,
        }}
      >
        <ShoppingCart
          size={80}
          className="mb-6 drop-shadow-lg"
          style={{ color: colors.primary }}
        />
        <h1
          className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight"
          style={{
            color: colors.primary,
            textShadow: `2px 2px 8px ${colors.primary}33`,
          }}
        >
          Welcome to ShopCart
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-80">
          Your one-stop shop for everything you need. Discover amazing products
          at unbeatable prices and experience seamless shopping.
        </p>
        <button
          onClick={handleExploreClick}
          className="px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          style={{
            backgroundColor: colors.primary,
            color: "var(--color-on-primary)",
            boxShadow: `0 8px 25px -5px ${colors.primary}77`,
          }}
        >
          Explore All Products
        </button>
      </div>

      {/* Featured Products Section */}
      <div className="w-full max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Featured Products</h2>
        {loading ? ( // Tampilan skeleton saat loading
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-2xl border animate-pulse" style={{ backgroundColor: "var(--color-surface)", borderColor: "var(--color-accent)" }}>
                <div className="h-56 rounded-t-2xl" style={{ backgroundColor: colors.secondary }}></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 rounded" style={{ backgroundColor: colors.secondary }}></div>
                  <div className="h-5 w-3/4 rounded" style={{ backgroundColor: colors.secondary }}></div>
                  <div className="h-10 rounded-lg" style={{ backgroundColor: colors.secondary }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : ( // Tampilan produk setelah data dimuat
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
                style={{
                  backgroundColor: "var(--color-surface)",
                  borderColor: "var(--color-accent)",
                  boxShadow: `0 10px 30px -15px ${colors.primary}44`,
                }}
              >
                <div className="w-full h-56 flex-shrink-0 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 text-left flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 flex-grow">{product.title}</h3>
                  <p className="text-xl font-bold mb-4" style={{ color: colors.primary }}>${product.price.toFixed(2)}</p>
                  <Link to={`/products/${product.id}`} className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-md font-semibold transition-all duration-300" style={{ backgroundColor: colors.primary, color: "var(--color-on-primary)" }}>
                    <Eye size={18} className="transition-transform duration-300 group-hover:scale-110" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
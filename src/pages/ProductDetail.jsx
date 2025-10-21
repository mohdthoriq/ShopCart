import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";
import { ShoppingCart, ArrowLeft, Star } from "lucide-react";

const ProductDetailSkeleton = () => {
  const { colors } = useTheme();
  return (
    <div className="container mx-auto p-6 animate-pulse">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="rounded-xl h-96" style={{ backgroundColor: colors.secondary }}></div>
        <div className="space-y-6">
          <div className="h-8 w-3/4 rounded" style={{ backgroundColor: colors.secondary }}></div>
          <div className="h-6 w-1/4 rounded" style={{ backgroundColor: colors.secondary }}></div>
          <div className="h-10 w-1/3 rounded" style={{ backgroundColor: colors.secondary }}></div>
          <div className="space-y-3">
            <div className="h-4 w-full rounded" style={{ backgroundColor: colors.secondary }}></div>
            <div className="h-4 w-full rounded" style={{ backgroundColor: colors.secondary }}></div>
            <div className="h-4 w-5/6 rounded" style={{ backgroundColor: colors.secondary }}></div>
          </div>
          <div className="h-12 w-48 rounded-lg" style={{ backgroundColor: colors.secondary }}></div>
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { colors, theme } = useTheme();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      showNotification(`${product.title} added to cart!`, "success");
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error: {error || "Product could not be loaded."}</h1>
        <Link to="/products" className="text-blue-500 hover:underline mt-4 inline-block">Go back to products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-12">
      <div className="mb-8">
        <Link to="/products" className="inline-flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity" style={{ color: colors.primary }}>
          <ArrowLeft size={20} />
          Back to All Products
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="rounded-xl p-8 flex items-center justify-center shadow-lg" style={{ backgroundColor: "var(--color-surface)" }}>
          <img src={product.image} alt={product.title} className="max-h-96 w-auto object-contain" />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold uppercase tracking-wider opacity-70">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <Star className="fill-yellow-400 text-yellow-400" size={20} />
            <span className="font-bold">{product.rating.rate}</span>
            <span className="opacity-70">({product.rating.count} reviews)</span>
          </div>
          <p className="text-4xl font-light" style={{ color: colors.primary }}>${product.price.toFixed(2)}</p>
          <p className="text-base leading-relaxed opacity-90 mt-2">{product.description}</p>
          <button onClick={handleAddToCart} className="mt-6 flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-300" style={{ backgroundColor: colors.primary, color: "var(--color-on-primary)" }}>
            <ShoppingCart size={22} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
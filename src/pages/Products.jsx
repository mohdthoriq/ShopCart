import { useState, useEffect, useMemo } from "react";
import { useTheme } from "../context/ThemeProvider";
import { Search, Funnel, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import ErrorDisplay from "../components/ErrorDisplay";

const ProductSkeleton = () => {
  const { colors, theme } = useTheme();
  const bgColor = theme === 'light' ? colors.surface : colors.secondary;
  const pulseColor = theme === 'light' ? '#E2E8F0' : '#374151';

  return (
    <div className="rounded-xl shadow-md overflow-hidden animate-pulse" style={{ backgroundColor: bgColor }}>
      <div className="w-full h-48" style={{ backgroundColor: pulseColor }}></div>
      <div className="p-4 space-y-3">
        <div className="h-4 rounded w-3/4" style={{ backgroundColor: pulseColor }}></div>
        <div className="h-4 rounded w-1/2" style={{ backgroundColor: pulseColor }}></div>
        <div className="h-10 rounded" style={{ backgroundColor: pulseColor }}></div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { colors } = useTheme();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (sort === "low-to-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high-to-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, searchTerm, category, sort]);

  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchProducts} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 transition-colors">
      <div className="mb-8">
        <div className="flex flex-row justify-center items-center gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 pl-10 pr-4 py-2 rounded-lg border outline-none transition-all duration-300"
              style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-primary)", color: "var(--color-text)" }}
            />
          </div>
          <button onClick={() => setFiltersVisible(!filtersVisible)} className="flex items-center gap-2 px-2 py-2 rounded-lg transition-all duration-300" style={{ backgroundColor: "var(--color-secondary)", color: "var(--color-text)" }}>
            <Funnel size={18} />
            <ChevronDown size={18} className={`transition-transform ${filtersVisible ? "rotate-180" : ""}`} />
          </button>
        </div>
        {filtersVisible && (
          <div className="flex justify-center">
            <div className="flex flex-row justify-center items-center gap-4 mt-4 p-4 rounded-lg transition-all" style={{ backgroundColor: "var(--color-accent)" }}>
              <div className="flex-1 min-w-[150px] max-w-[200px]">
                <label className="block text-sm font-medium mb-2 text-white">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 rounded border outline-none" style={{ borderColor: "var(--color-primary)", backgroundColor: "var(--color-surface)", color: "var(--color-text)" }}>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[150px] max-w-[200px]">
                <label className="block text-sm font-medium mb-2 text-white">Sort By</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full p-2 rounded border outline-none" style={{ borderColor: "var(--color-primary)", backgroundColor: "var(--color-surface)", color: "var(--color-text)" }}>
                  <option value="default">Default</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 min-[340px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {[...Array(20)].map((_, i) => <ProductSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[340px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
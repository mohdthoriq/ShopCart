import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { Search, Filter, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Buat promise untuk fetch data
        const fetchPromise = fetch("https://fakestoreapi.com/products").then(
          (res) => {
            if (!res.ok) throw new Error("Failed to fetch");
            return res.json();
          }
        );

        // Buat promise untuk jeda minimal 1 detik
        const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000));

        // Tunggu keduanya selesai
        const [data] = await Promise.all([fetchPromise, delayPromise]);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (sortOrder === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, searchTerm, selectedCategory, sortOrder]);

  if (error) throw new Error(error);

  return (
    <div className="container mx-auto px-4 py-8 transition-colors">
      {/* Search and Filter Controls */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 pl-10 pr-4 py-2 rounded-lg border outline-none transition-all duration-300"
              style={{
                backgroundColor: "var(--color-bg)",
                borderColor: "var(--color-primary)",
                color: "var(--color-text)",
              }}
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "var(--color-text)",
            }}
          >
            <Filter size={18} />
            Filters
            <ChevronDown
              size={18}
              className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="flex justify-center">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 rounded-lg transition-all md:w-auto"
              style={{
                backgroundColor: "var(--color-accent)",
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 rounded border outline-none"
                  style={{
                    borderColor: "var(--color-primary)",
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text)",
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">
                  Sort By
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full p-2 rounded border outline-none"
                  style={{
                    borderColor: "var(--color-primary)",
                    backgroundColor: "var(--color-surface)",
                    color: "var(--color-text)",
                  }}
                >
                  <option value="default">Default</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

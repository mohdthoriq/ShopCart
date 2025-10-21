import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import useCart from "../hooks/useCart"
import useNotification from "../hooks/useNotification"
import { useTheme } from "../context/ThemeProvider"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { showNotification } = useNotification()
  const { colors } = useTheme()

  const handleAddToCart = () => {
    addToCart(product)
    showNotification(`${product.title} added to cart!`, "success")
  }

  const bgColor = colors.secondary
  const textColor = colors.text
  const priceColor = colors.primary
  const hoverColor = colors.accent
  const borderColor = colors.border || "#ccc"

  return (
    <div
      className="rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: textColor,
      }}
    >
      <Link to={`/products/${product.id}`} className="block">
        <img
          className="w-full h-36 sm:h-48 object-contain p-2 sm:p-4 transition-all"
          src={product.image}
          alt={product.title}
        />
      </Link>

      <div className="p-2 sm:p-4 flex flex-col flex-grow">
        <h3
          className="font-semibold text-sm sm:text-lg truncate flex-grow transition-colors duration-300"
          style={{ color: textColor }}
        >
          {product.title}
        </h3>

        <p
          className="capitalize text-xs sm:text-sm mb-2 transition-opacity duration-300"
          style={{ opacity: 0.8, color: textColor }}
        >
          {product.category}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mt-auto gap-2">
          <span
            className="font-bold text-lg sm:text-xl transition-colors duration-300"
            style={{ color: priceColor }}
          >
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto p-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              backgroundColor: colors.primary,
              color: "var(--color-on-primary)",
              fontWeight: "bold",
            }}
          >
            <ShoppingCart size={16} />
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

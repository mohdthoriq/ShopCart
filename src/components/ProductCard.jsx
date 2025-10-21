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
          className="w-full h-48 object-contain p-4"
          src={product.image}
          alt={product.title}
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="font-semibold text-lg truncate flex-grow transition-colors duration-300"
          style={{ color: textColor }}
        >
          {product.title}
        </h3>

        <p
          className="capitalize mb-2 transition-opacity duration-300"
          style={{ opacity: 0.8, color: textColor }}
        >
          {product.category}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span
            className="font-bold text-xl transition-colors duration-300"
            style={{ color: priceColor }}
          >
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            className="p-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: hoverColor + "33", // versi transparan biar lembut
              color: priceColor,
              fontSize: "14px",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = hoverColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = hoverColor + "33")
            }
          >
             Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

import React from "react"
import { useTheme } from "../context/ThemeProvider"

class ErrorBoundaryInner extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    const { colors } = this.props

    if (hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center transition-all duration-500"
          style={{
            backgroundColor: colors.background,
            color: colors.text,
          }}
        >
          <div
            className="rounded-xl shadow-lg p-8 max-w-md w-full text-center transition-all duration-500"
            style={{
              backgroundColor: colors.secondary,
              color: colors.text,
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: colors.danger }}
            >
              Something went wrong
            </h2>

            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg font-semibold transition-all duration-300"
              style={{
                backgroundColor: colors.primary,
                color: "var(--color-on-primary)",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// 🔥 Wrapper untuk akses context (karena class nggak bisa pakai hook)
export const ErrorBoundary = ({ children }) => {
  const { colors } = useTheme()

  return <ErrorBoundaryInner colors={colors}>{children}</ErrorBoundaryInner>
}

export default ErrorBoundary

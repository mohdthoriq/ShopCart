import { Suspense } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ProductsPage from './pages/Products';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound'; 
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeProvider';



// ... import dan context di atas ...

// ======================
// PROTECTED ROUTE
// ======================
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppContent = () => {
  const { theme } = useTheme(); // ganti ini

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <Navbar />
      <main>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route
              path="/products"
              element={
                <ErrorBoundary>
                  <ProductsPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/cart"
              element={
                <ErrorBoundary>
                  <CartPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      {/* Rute yang menggunakan layout utama (dengan Navbar) */}
      <Route path="/*" element={<AppContent />} />
      {/* Rute yang berdiri sendiri (tanpa Navbar) */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
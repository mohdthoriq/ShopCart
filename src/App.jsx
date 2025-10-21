import { Suspense } from 'react';
import './App.css'
import Navbar from './components/Navbar';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ProductsPage from './pages/Products';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import ProductDetailPage from './pages/ProductDetail';
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

const AppLayout = () => {
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
      <main><Outlet /></main>
    </div>
  );
};

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<AppLayout />}>
          <Route path="/products" element={<ErrorBoundary><ProductsPage /></ErrorBoundary>} />
          <Route path="/cart" element={<ErrorBoundary><CartPage /></ErrorBoundary>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}